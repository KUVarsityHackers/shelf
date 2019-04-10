# shelf

shelf is a web app designed to streamline the process of borrowing books within a community. Communities tied together through school, religion, location, or any other shared interests can now consolidate a massive crowd-sourced library of media to share between each other.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install
them

```
This project requires jsdoc for the documentation and python flask
for server-side hosting.
Requirements can be found in the requirrements.txt file in the root directory.
```

### Installing

A step by step series of examples that tell you how to get a development env running

Install the necessary python libraries

```
python3 -m pip install -r requirements.txt
```

then modify the port at the bottom of server.py as needed

and start up the server

```
python3 server.py
```

## Building the docs

Building the docs is as easy as running

```
jsdoc -c config.json
```

from the root directory

docs will be built in "static/docs/" directory and can be accessed through

```
example.com/docs/
```

## Deployment

For deployment to a live system make sure to turn flask debug mode off

## Built With

* [Flask](http://flask.pocoo.org) - The backend server used
* [Firebase](https://firebase.google.com/docs/) - The storage method
* [JsDoc3](http://usejsdoc.org) - Used to generate autodocumentation

## Authors

* **Andre Kurat** - *Initial work* - [AndreKurait](https://github.com/AndreKurait)

* **Michael Svoren** - *Initial work* - [mdsvoren](https://github.com/mdsvoren)

* **Nathan Nichols** - *Initial work* - [natenichols](https://github.com/natenichols)

* **Colin Floyd** - *Initial work* - [czfloyd](https://github.com/czfloyd)

* **Tiernon Riesenmy** - *Initial work* - [TiernonRR](https://github.com/TiernonRR)

## References/Citations
* https://www.googleapis.com/books/v1/volumes?q=isbn:9781119259756
* https://www.geeksforgeeks.org/get-post-requests-using-python/


## License

This project is licensed under the MIT License

# Build Process

You can find the gant chart used [here](https://docs.google.com/spreadsheets/d/1LpeLnEP7ImVL90qSGQHIsktWfbXGHQE5Drwao6LR-2w/edit?usp=sharing)
