all: publish

# Source Directories
ASSETSDIR="assets"
FIGUREDIR="figures"

# Assets
TEXPREAMBLE="preamble.tex"
BIBBIBLIOGRAPHY="references.bib"


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
		--include-in-header=$(ASSETSDIR)/$(TEXPREAMBLE) \
		--bibliography=$(ASSETSDIR)/$(BIBBIBLIOGRAPHY) \
		--variable documentclass=scrbook \
		--variable fontsize=12pt \
		--variable classoption=openright \
		--variable papersize=a4paper,oneside,headsepline \
		--variable bibliography=totocnumbered \
		--table-of-contents \
		--chapter $(BUILDDIR)/$(DOCUMENTMARKDOWN)\
		--output $(BUILDDIR)/$(DOCUMENTPDF)


doc: prepare
	@echo "Creating doc output ..."

publish: pdf
	@echo "Publishing final results ..."
	@mkdir -p $(PUBLISHDIR)
	@cp $(BUILDDIR)/$(DOCUMENTPDF) $(PUBLISHDIR)
	@git commit -m '(Auto-Publish by make) Updated pdf to newest version' -- $(PUBLISHDIR)

clean:
	@echo "Cleaning up ..."
	@rm -r $(BUILDDIR)

