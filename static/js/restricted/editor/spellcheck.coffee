###
Rawscripts - Screenwriting Software
Copyright (C) Ritchie Wilson

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
###

class Spellcheck
    constructor: ->
        if EOV != 'editor'
            return
        @LINES_PER_BATCH = 100
        @popupId = "spellcheckpopup"
        @popupElem = $("#" + @popupId)
        @popupElem.find(".close").click (event) => @closePopup(event)
        $("#sIgnore").click (event) => @ignore(event)
        $("#sIgnoreAll").click (event) => @ignoreAll(event)
        $("#sChange").click (event) => @change(event)

    launch: ->
        if EOV != 'editor'
            return
        setTypeToScript(false)
        @lines_with_errors = []
        @current_line_index = null
        @current_error_in_line = null
        @ignoreWords = []
        @popupElem.css "visibility", "visible"
        @fetchSpellingData(0)

    closePopup: (event) ->
        causedChange = false
        for line in @lines_with_errors
            newText = (s.text for s in line.lineSegments).join('')
            causedChange or= (lines[line.index].text != newText)
            lines[line.index].text = newText
        wrapAll()
        pagination()
        if causedChange
            saveTimer()
        @popupElem.css "visibility", "hidden"
        setTypeToScript(true)

    fetchSpellingData: (startFrom) ->
        if startFrom >= lines.length
            if @current_line_index is null
                @renderCurrentError()
            return
        batch = lines[startFrom...(startFrom + @LINES_PER_BATCH)]
        lineIndex = startFrom
        for line in batch
            line.index = lineIndex
            lineIndex++
        data = {batch: JSON.stringify(batch), start_from: startFrom}
        $.post('/spellcheck', data, (a, b, c) => @parseSpellingResponse(a, b, c))

    parseSpellingResponse: (data, textStatus, jqXHR) ->
        for line in data.spellingData
            @lines_with_errors.push line
        startFrom = @LINES_PER_BATCH + parseInt(data.startFrom)
        if @current_line_index is null and @lines_with_errors.length > 0
            @nextError()
            @renderCurrentError()
        @fetchSpellingData startFrom

    getCurrentError: ->
        if @lines_with_errors == [] or @current_line_index is null
            return null
        segments = @lines_with_errors[@current_line_index].lineSegments
        return (s for s in segments when s.err)[@current_error_in_line]

    nextError: ->
        if @lines_with_errors == []
            @current_line_index = @current_error_in_line = null
            return # there is no 'next' if there are no errors
        if @current_line_index is null
            @current_line_index = 0
            @current_error_in_line = -1
        @current_error_in_line++
        segments = @lines_with_errors[@current_line_index].lineSegments
        num_errors = (s for s in segments when s.err).length
        if num_errors <= @current_error_in_line
            @current_error_in_line = 0
            @current_line_index++

        # check if this has gone past last error
        if @current_line_index >= @lines_with_errors.length
            @current_line_index = @current_error_in_line = null
            return

        if @getCurrentError().text in @ignoreWords
            @nextError()

    renderCurrentError: ->
        # cleanup old data
        $("#sSentance").empty()
        $(".spellcheckitem").remove()

        if @current_line_index is null
            @alertDoneChecking()
            return

        # render original text with bad word in red
        err_index = 0
        suggest = []
        for segment in @lines_with_errors[@current_line_index].lineSegments
            span = $("<span>").text(@getStringInCorrectCase(segment.text))
            if segment.err
                if err_index == @current_error_in_line
                    span.attr("id", "sFocus").css("color", "red")
                    suggest = segment.suggest
                err_index++
            $("#sSentance").append(span)

        # render suggestions box
        for s in suggest
            displayText = @getStringInCorrectCase(s)
            item = $("<div>").addClass("spellcheckitem").text(displayText).data("text", s)
            $("#sSuggest").append(item)
        $(".spellcheckitem").click((event) => @selectSuggestion(event))

    selectSuggestion: (event) ->
        $("#spellcheckfocus").removeAttr("id")
        elem = $(event.target)
        elem.attr("id", "spellcheckfocus")
        text = @getStringInCorrectCase(elem.data("text"))
        $("#sFocus").text(text)

    alertDoneChecking: ->
        alert "Done Spell Checking"
        @closePopup()

    getStringInCorrectCase: (string)->
        currentLine = @lines_with_errors[@current_line_index]
        toUpper = lines[currentLine.index].format in [0, 2, 5]
        return if toUpper then string.toUpperCase() else string

    ignore: (event) ->
        @nextError()
        @renderCurrentError()

    ignoreAll: (event) ->
        word = @getCurrentError().text
        if word not in @ignoreWords
            @ignoreWords.push(word)
        @ignore()

    change: (event) ->
        elem = $("#spellcheckfocus")
        if elem.length == 0
            return
        replaceWith = elem.data("text")
        error = @getCurrentError()
        error.old_text = error.text
        error.text = replaceWith
        @nextError()
        @renderCurrentError()

spell = new Spellcheck()
