all: publish

# Source Directories
ASSETSDIR="assets"
FIGUREDIR="figures"

BUILDDIR="build"
DOCUMENTMARKDOWN="document.markdown"
DOCUMENTPDF="document.pdf"


PUBLISHDIR="publish"

prepare:
	@echo "prepare"
	@mkdir -p $(BUILDDIR)
	@cat `find . -name "*.markdown" | sort` > $(BUILDDIR)/$(DOCUMENTMARKDOWN)
	@cp -R $(FIGUREDIR) $(BUILDDIR)

pdf: prepare
	@echo "pdf"
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
	@echo "doc"

publish: pdf doc
	@echo "publish"
	@mkdir -p $(PUBLISHDIR)
	@cp $(BUILDDIR)/$(DOCUMENTPDF) $(PUBLISHDIR)

clean:
	@echo "clean"
	@rm -r $(BUILDDIR)

