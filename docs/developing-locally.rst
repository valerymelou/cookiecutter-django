Getting Up and Running Locally
==============================

.. index:: pip, virtualenv, PostgreSQL

The steps below will get you up and running with a local development environment. We assume you have the following installed:

* pip
* virtualenv
* PostgreSQL

First make sure to create and activate a virtualenv_, then open a terminal at the project root.

Then install the requirements for your local development::

    $ pip install -r requirements/local.txt

.. _virtualenv: http://docs.python-guide.org/en/latest/dev/virtualenvs/

Then, create a PostgreSQL database with the following command, where `[project_slug]` is what value you entered for your project's `project_slug`::

    $ createdb [project_slug]

`Cookiecutter Django` uses the excellent `django-environ`_ package, which includes a ``DATABASE_URL`` environment variable to simplify database configuration in your Django settings.
Rename env.example to .env to begin updating the file with your own environment variables. To add your database, define ``DATABASE_URL`` and add it to the .env file, as shown below:

.. parsed-literal::

    DATABASE_URL="postgres://*<pg_user_name>*:*<pg_user_password>*\ @127.0.0.1:\ *<pg_port>*/*<pg_database_name>*"

.. _django-environ: http://django-environ.readthedocs.io

You can now run the usual Django ``migrate`` and ``runserver`` commands::

    $ python manage.py migrate
    $ python manage.py runserver

**Setup your email backend**

To send email you need to `configure your email backend`_

.. _configure your email backend: http://docs.djangoproject.com/en/1.9/topics/email/#smtp-backend

In development emails are printed to the console.

**Integrate Gulp to your project**

If you'd like to take advantage of common frontend development tools, you can do so with the included Gulpfile.

Make sure that nodejs_ is installed. Then in the project root run::

    $ npm install

    $ gulp

The base app will now run as it would with the usual ``manage.py runserver`` but with:

* Live reloading
* Sass compilation, CSS concatenation and compression
* JavaScript validation, concatenation and compression
* Images optimization

all enabled.

.. _nodejs: http://nodejs.org/download/

Optimized static files are generated in a ``dist`` folder in your static files folder. To serve them in your project, you can add something like this in your HTML:
``<link href="{% static 'css/project.min.css' %}" rel="stylesheet">``.

To read about all included gulp tasks see :ref:`gulp-tasks`.

It's time to write the code!!!
