\appendix

# Appendix {#AppendixA}

## Development Workflow

The development environment and workflow is straightforward:

![Workflow](figures/Workflow.png)

By default there is a [git pre-commit hook](http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) setup which will run the unit tests locally and ensure the code is according the guidelines (jscs, jshint). Once committed locally changes will be pushed to Github and Travis (Continues Integration) will compile the project and run the unit tests once more. As soon this is done and there are no errors the code will be deployed automatically on Heroku. 
