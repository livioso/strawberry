#! /bin/bash

pandoc  --latex-engine=xelatex -H content/preamble.tex -V documentclass:scrbook -V fontsize=11pt -V classoption:openright -V papersize:a4paper,oneside,BCOR10mm -V bibliography:totocnumbered--chapter content/chapters/000.md content/chapters/001_introduction.md content/chapters/010_chapter1.md content/chapters/020_chapter2.md content/chapters/100_appendix.md content/chapters/110_references.md --bibliography=content/references.bib -o "output/thesis.pdf"
