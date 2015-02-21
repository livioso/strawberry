all: publish

# Source Directories
ASSETSDIR="assets"
FIGUREDIR="figures"

BUILDDIR="build"
DOCUMENTMARKDOWN="document.markdown"
DOCUMENTPDF="document.pdf"


PUBLISHDIR="publish"

prepare:
	@echo "Preparing ..."
	@mkdir -p $(BUILDDIR)
	@cat `find . -name "*.markdown" | sort` > $(BUILDDIR)/$(DOCUMENTMARKDOWN)
	@cp -R $(FIGUREDIR) $(BUILDDIR)

pdf: prepare
	@echo "Creating pdf output ..."
	@pandoc \
		--latex-engine=xelatex \
		-H $(ASSETSDIR)/preamble.tex \
		--bibliography=$(ASSETSDIR)/references.bib \
		-V documentclass:scrbook \
		-V fontsize=11pt \
		-V classoption:openright \
		-V papersize:a4paper,oneside,BCOR10mm \
		-V bibliography:totocnumbered \
		--chapter $(BUILDDIR)/$(DOCUMENTMARKDOWN)\
		-o $(BUILDDIR)/$(DOCUMENTPDF)


doc: prepare
	@echo "Creating doc output ..."

publish: pdf doc
	@echo "Publishing final results ..."
	@mkdir -p $(PUBLISHDIR)
	@cp $(BUILDDIR)/$(DOCUMENTPDF) $(PUBLISHDIR)
	@git commit -m '(Auto-Publish by make) Updated pdf to newest version' -- $(PUBLISHDIR)

clean:
	@echo "clean"
	@rm -r $(BUILDDIR)

