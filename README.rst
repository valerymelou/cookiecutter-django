cookiecutter-django-gulp
========================

.. image:: https://pyup.io/repos/github/valerymelou/cookiecutter-django-gulp/shield.svg
     :target: https://pyup.io/repos/github/valerymelou/cookiecutter-django-gulp/
     :alt: Updates

.. image:: https://travis-ci.org/valerymelou/cookiecutter-django-gulp.svg?branch=master
     :target: https://travis-ci.org/valerymelou/cookiecutter-django-gulp
     :alt: Build Status

A Cookiecutter_ template for Django.

.. _cookiecutter: https://github.com/audreyr/cookiecutter


Features
--------

* For Django 1.9
* Renders Django projects with 100% starting test coverage
* Twitter Bootstrap_ v4.0.0 - alpha_
* 12-Factor_ based settings via django-environ_
* Optimized development and production settings
* Sass compilation plus CSS, JavaScript and image optimization with Gulp_
* Dependencies management with Bower_
* Works with Python 2.7.x or 3.5.x
* Run tests with unittest or py.test

.. _Bootstrap: https://github.com/twbs/bootstrap
.. _alpha: http://blog.getbootstrap.com/2015/08/19/bootstrap-4-alpha/
.. _12-Factor: http://12factor.net/
.. _django-environ: https://github.com/joke2k/django-environ
.. _Gulp: http://gulpjs.com/
.. _Bower: http://bower.io/


Constraints
-----------

* Only maintained 3rd party libraries are used.
* PostgreSQL everywhere (9.0+)
* Environment variables for configuration (This won't work with Apache/mod_wsgi).


Usage
------

Let's pretend you want to create a Django project called "redditclone". Rather than using `startproject`
and then editing the results to include your name, email, and various configuration issues that always get forgotten until the worst possible moment, get cookiecutter_ to do all the work.

First, get cookiecutter. Trust me, it's awesome::

    $ pip install cookiecutter

Now run it against this repo::

    $ cookiecutter https://github.com/valerymelou/cookiecutter-django-gulp.git

You'll be prompted for some questions, answer them, then it will create a Django project for you.


**Warning**: After this point, change 'Valery Melou', 'valerymelou', etc to your own information.

**Warning**: project_slug must be a valid Python module name or you will have issues on imports.

It prompts you for questions. Answer them::

    Cloning into 'cookiecutter-django-gulp'...
    remote: Counting objects: 550, done.
    remote: Compressing objects: 100% (310/310), done.
    remote: Total 550 (delta 283), reused 479 (delta 222)
    Receiving objects: 100% (550/550), 127.66 KiB | 58 KiB/s, done.
    Resolving deltas: 100% (283/283), done.
    project_name [project_name]: Reddit Clone
    project_slug [Reddit_Clone]: reddit
    author_name [Your Name]: Valery Melou
    email [Your email]: valerymelou@gmail.com
    description [A short description of the project.]: A reddit clone.
    domain_name [example.com]: myreddit.com
    version [0.1.0]: 0.0.1
    timezone [UTC]:
    now [2016/03/01]: 2016/03/05
    year [2015]:
    windows [n]: n
    use_python2 [n]: y
    use_gulp [n]: n
    Select open_source_license:
    1 - MIT
    2 - BSD
    3 - Not open source
    Choose from 1, 2, 3 [1]: 1

Enter the project and take a look around::

    $ cd reddit/
    $ ls

Create a GitHub repo and push it there::

    $ git init
    $ git add .
    $ git commit -m "first awesome commit"
    $ git remote add origin git@github.com:valerymelou/redditclone.git
    $ git push -u origin master

Now take a look at your repo. Don't forget to carefully look at the generated README. Awesome, right?

For development, see the following for local development:

* `Developing locally`_

.. _`Developing locally`: http://cookiecutter-django-gulp.readthedocs.io/en/latest/developing-locally.html


"Your Stuff"
-------------

Scattered throughout the Python and HTML of this project are places marked with "your stuff". This is where third-party libraries are to be integrated with your project.

Releases
--------

Want a stable release? You can find them at https://github.com/valerymelou/cookiecutter-django-gulp/releases


Not Exactly What You Want?
---------------------------

This is what I want. *It might not be what you want.* Don't worry, you have options:

Fork This
~~~~~~~~~~

If you have differences in your preferred setup, I encourage you to fork this to create your own version.
Once you have your fork working, let me know and I'll add it to a '*Similar Cookiecutter Templates*' list here.
It's up to you whether or not to rename your fork.

If you do rename your fork, I encourage you to submit it to the following places:

* cookiecutter_ so it gets listed in the README as a template.
* The cookiecutter grid_ on Django Packages.

.. _cookiecutter: https://github.com/audreyr/cookiecutter
.. _grid: https://www.djangopackages.com/grids/g/cookiecutters/

Or Submit a Pull Request
~~~~~~~~~~~~~~~~~~~~~~~~~

I also accept pull requests on this, if they're small, atomic, and if they make my own project development
experience better.
