Mini Book
=============================

This application is an Angular UI built on a python Flask back end.
The Flask api is in the server directory.  The Angular frontend is 
in the client directory. It was built using python 3.9.2 and node v16.13.1.
To run this application, first build the Angular UI.  To build the
you will need node.

Getting started
---------------

- Clone this example. For quick review the angular app has been built and checked in to the repo if you want to rebuild the client follow the next steps.

- Update your workstation's Angular cli command.

        npm install -g @angular/cli
        ng --version

- From the client directory

        # install node_modules
        npm install

        #build angular app
        ng build -- --build-optimizer --deploy-url=/static/ --base-href=/ --output-path=dist
        
        #Copy the build products into the flask app
        cp /client/dist/* /server/flask_ap/main/static/

        #Move index.htm
        mv /server/flask_ap/main/static/index.html /server/flask_ap/main/templates/index.html 

- From the server directory

        #Set up a python virtual environment (may need pip install virtualenv)
        python -m venv venv
        
        #Use the environment  (.\venv\Scripts\activate)
        source venv/bin/activate

        #Install requirements
        pip install -r requirements.txt

        #run the flask app
        FLASK_APP=flask_app FLASK_ENV=development flask run

        #When you are done with the virtual environment deactivate it
        deactivate
