#!/usr/bin/env python

import os
import sys

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

# Our version ALWAYS matches the version of Django we support
# If Django has a new release, we branch, tag, then update this setting after the tag.
version = "1.9.5"

if sys.argv[-1] == 'tag':
    os.system('git tag -a %s -m "version %s"' % (version, version))
    os.system('git push --tags')
    sys.exit()

with open('README.rst') as readme_file:
    long_description = readme_file.read()

setup(
    name='cookiecutter-django-gulp',
    version=version,
    description='A Cookiecutter template for integrating frontend development tools in Django projects.',
    long_description=long_description,
    author='Valery Melou',
    author_email='valerymelou@gmail.com',
    url='https://github.com/valerymelou/cookiecutter-django-gulp',
    packages=[],
    license='MIT',
    zip_safe=False,
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Console',
        'Framework :: Django :: 1.9',
        'Intended Audience :: Developers',
        'Natural Language :: English',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: Implementation :: CPython',
        'Programming Language :: Python :: Implementation :: PyPy',
        'Topic :: Software Development',
    ],
    keywords=(
        'cookiecutter, Python, projects, project templates, django, '
        'frontend, gulp, optimization, compass, sass, minification, skeleton, '
        'scaffolding, project directory, setup.py'
    ),
)
