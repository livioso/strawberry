all: pdf docx

# Source Directories
ASSETSDIR="assets"
FIGUREDIR="figures"

# Individual Assets
TEXPREAMBLE="options.sty"
TEXTEMPLATE="template.tex"
BIBBIBLIOGRAPHY="references.bib"
YAMLMETADATA="metadata.yaml"

# Build and Output
BUILDDIR="build"
DOCUMENTMARKDOWN="document.markdown"
DOCUMENTPDF="document.pdf"
DOCUMENTDOCX="document.docx"

PUBLISHDIR="publish"


prepare: clean
	@echo "Preparing ..."
	@mkdir -p $(BUILDDIR)
	@cat `find . -name "*.markdown" | sort` > $(BUILDDIR)/$(DOCUMENTMARKDOWN)
	@cp -R $(FIGUREDIR) $(BUILDDIR)


pdf: prepare
	@echo "Creating pdf output ..."
	@pandoc \
		--latex-engine=xelatex \
		--template=$(ASSETSDIR)/$(TEXTEMPLATE) \
		--include-in-header=$(ASSETSDIR)/$(TEXPREAMBLE) \
		--bibliography=$(ASSETSDIR)/$(BIBBIBLIOGRAPHY) \
		--variable documentclass=scrbook \
		--variable fontsize=13pt \
		--variable mainfont='Helvetica Neue' \
		--variable sansfont='Helvetica Neue' \
		--variable classoption=openright \
		--variable papersize=a4paper,oneside,headsepline \
		--variable bibliography=totocnumbered \
		--variable custom-title-image=figures/StrawberryBannerTitle \
		--highlight-style=tango \
		--table-of-contents \
		--toc-depth=4 \
		-fmarkdown-implicit_figures \
		--number-sections \
		--chapter $(BUILDDIR)/$(DOCUMENTMARKDOWN) $(ASSETSDIR)/$(YAMLMETADATA) \
		--output $(BUILDDIR)/$(DOCUMENTPDF)


docx: prepare
	@echo "Creating docx output ..."
	@pandoc \
		--standalone -S $(BUILDDIR)/$(DOCUMENTMARKDOWN) \
		--output $(BUILDDIR)/$(DOCUMENTDOCX)


publish: pdf
	@echo "Publishing final results ..."
	@mkdir -p $(PUBLISHDIR)
	@cp $(BUILDDIR)/$(DOCUMENTPDF) $(PUBLISHDIR)
	@git commit -m '(Auto-Publish by make) Updated pdf to newest version.' -- $(PUBLISHDIR)


clean:
	@echo "Cleaning up ..."
	@rm -rf $(BUILDDIR)
