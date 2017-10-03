#!/usr/bin/env node

/*!
 * Script to run vnu-jar if Java is available.
 * Copyright 2017 The Bootstrap Authors
 * Copyright 2017 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

'use strict'

const childProcess = require('child_process')
const vnu = require('vnu-jar')

childProcess.exec('java -version', function (error) {
  if (error) {
    console.error('Skipping HTML lint test; Java is missing.')
    return
  }

  const ignores = [
    'Attribute “autocomplete” is only allowed when the input type is “color”, “date”, “datetime-local”, “email”, “hidden”, “month”, “number”, “password”, “range”, “search”, “tel”, “text”, “time”, “url”, or “week”.',
    'Attribute “autocomplete” not allowed on element “button” at this point.',
    'Consider using the “h1” element as a top-level heading only (all “h1” elements are treated as top-level headings by many screen readers and other tools).',
    'Element “img” is missing required attribute “src”.',
    'Element “legend” not allowed as child of element “div” in this context.',
    'Element “ul” not allowed as child of element “ul” in this context.',
    'The “datetime-local” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
    'The “main” role is unnecessary for element “main”.'
  ]

  const args = [
    '-jar',
    vnu,
    '--asciiquotes',
    '--errors-only',
    '--skip-non-html',
    '_gh_pages/',
    'js/tests/visual/'
  ]

  ignores.forEach((ignore) => {
    args.splice(2, 0, `--filterpattern "${ignore}"`)
  })

  return childProcess.spawn('java', args, {
    shell: true,
    stdio: 'inherit'
  })
  .on('exit', process.exit)
})
