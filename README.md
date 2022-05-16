# Based on UnderStrap WordPress Theme Framework

Website: [https://understrap.com](https://understrap.com)

Child Theme Project: [https://github.com/holger1411/understrap-child](https://github.com/holger1411/understrap-child)

#### See: [Official Demo](https://understrap.com/understrap) | Read: [Official Docs Page](https://understrap.github.io/)

## About

I’m a huge fan of Underscores, Bootstrap, and Sass. Why not combine these into a solid WordPress Theme Framework?
That’s what UnderStrap is.
You can use it as starter theme and build your own theme on top of it. Or you use it as parent theme and create your own child theme for UnderStrap.

## License
UnderStrap is released under the terms of the GPL version 2 or (at your option) any later version.

http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html

## Changelog
See [changelog](CHANGELOG.md)


## Basic Features

- Combines Underscore’s PHP/JS files and Bootstrap’s HTML/CSS/JS.
- Comes with Bootstrap (v4) Sass source files and additional .scss files. Nicely sorted and ready to add your own variables and customize the Bootstrap variables.
- Uses a single and minified CSS file for all the basic stuff.
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/) integration (v4.7.0)
- Jetpack ready.
- Contact Form 7 support.
- [Child Theme](https://github.com/holger1411/understrap-child) ready.
- Translation ready.

## Starter Theme + HTML Framework = WordPress Theme Framework

The _s theme is a good starting point to develop a WordPress theme. But it is “just” a raw starter theme. That means it outputs all the WordPress stuff correctly but without any layout or design.
Why not add a well known and supported layout framework to have a solid, clean and responsive foundation? That’s where Bootstrap comes in.

## Confused by All the CSS and Sass Files?

Some basics about the Sass and CSS files that come with UnderStrap:
- The theme itself uses the `/style.css`file just to identify the theme inside of WordPress. The file is not loaded by the theme and does not include any styles.
- The `/css/theme.css` and its minified little brother `/css/theme.min.css` file(s) provides all styles. It is composed of five different SCSS sets and one variable file at `/sass/theme.scss`:

                  - 1 "theme/theme_variables";  // <--------- Add your variables into this file. Also add variables to overwrite Bootstrap or UnderStrap variables here
                  - 2 "../src/bootstrap-sass/assets/stylesheets/bootstrap";  // <--------- All the Bootstrap stuff - Don´t edit this!
                  - 3 "understrap/understrap"; // <--------- Some basic WordPress stylings and needed styles to combine Boostrap and Underscores
                  - 4 "../src/fontawesome/scss/font-awesome"; // <--------- Font Awesome Icon styles

                  // Any additional imported files //
                  - 5 "theme/theme";  // <--------- Add your styles into this file

- Don’t edit the files no. 2-4 files/filesets or you won’t be able to update it without overwriting your own work!
- Your design goes into: `/src/sass/theme`. Add your styles to the `/src/sass/theme/_theme.scss` file and your variables to the `/scr/sass/theme/_theme_variables.scss`. Or add other .scss files into it and `@import` it into `/sass/theme/_theme.scss`.

## Developing With npm, composer, bower, Gulp and SASS and [Browser Sync][1]

### Installing Dependencies
- Make sure you have installed Node.js and gulp and Browser-Sync* (* optional, if you wanna use it) on your computer globally
- Then open your terminal and browse to the location of your UnderStrap copy
- Run: `$ npm install`
- Then you need to install the composer files
- Run: `$ composer install`

### Installing Bower and packages

- install bower globally
```shell
npm install -g bower
```
- install a package, replace the_package_name for the package name more info https://bower.io/
```shell
bower i the_package_name --save
gulp bower
```

### Initial configuration

A good pratices is to chamge the domain name of the theme. Just `find all and replace` the understrap (default domain name) to your domain_name

All configuration to gulp are in gulpconfig.json (such as, deploy paths, src paths), you don't need to change anything on gulpfile.js

NOTE: The gulp task watch is configure to minify all images placed on "/img/src", this could decrease your PC perfomarce, to disable this just go to the "watchTask" on the gulpconfig.json and change the "imagemin" to false.

### Running
To work and compile your Sass and JS files on the fly start:

- `gulp watch`

Or, to run with Browser-Sync:

- First change the browser-sync options to reflect your environment in the file `/gulpfile.js` in the beginning of the file:
```javascript
var browserSyncOptions = {
    proxy: "localhost/theme_test/", // <----- CHANGE HERE
    notify: false
};
```
- then run: `gulp watch-bs`

- build to a development: `gulp dist-dev`

- deploy to a development (after ftp configuration): `gulp deploy --dev`

- build to live: `gulp dist-prod`

- deploy to a live (after ftp configuration): `gulp deploy --prod`

- to deploy media files : `gulp deploy --dev --media` or `gulp deploy --prod --media`

## How to Use the Build-In Widget Slider

The front-page slider is widget driven. Simply add more than one widget to widget position “Hero”.
- Click on Appearance → Widgets.
- Add two, or more, widgets of any kind to widget area “Hero”.
- That’s it.


## CSS Breakpoints

This templates run on boostrap 4, but it have a custom breakpoints. This breakpoints are set in the sass/theme/_theme_variables. Here are those custom breakpoints:

```sass
$grid-breakpoints: (
  xs: 0,
  sm: 600px,
  md: 900px,
  lg: 1200px,
  xl: 1800px
);

$container-max-widths: (
  sm: 562px,
  md: 844px,
  lg: 1160px,
  xl: 1710px
);
```

Furthermore, this template uses a @include media function to make css media queries (http://include-media.com).

This are the default breakpoints

```sass
$breakpoints: (
  'phone': 320px,
  'tablet-portrait': 600px, //sm
  'tablet-landscape': 900px, //md
  'desktop': 1200px, //lg
  'large-desktop' : 1800px, //xl
);
```

## Page Templates

### Blank Template

The `blank.php` template is useful when working with various page builders and can be used as a starting blank canvas.

### Empty Template

The `empty.php` template displays a header and a footer only. A good starting point for landing pages.

### Full Width Template

The `fullwidthpage.php` template has full width layout without a sidebar.

[1] Visit [http://browsersync.io](http://browsersync.io) for more information on Browser Sync

## Aditional information

### TGM Plugin Activation

This template runs the TGM Plugin Activation (http://tgmpluginactivation.com/). This is a is a PHP library that allows you to easily require or recommend plugins for your WordPress themes (and plugins).

By default this template runs with this Plugins:

- Advanced Custom Fields PRO : REQUIRED
- Contact Form 7 : REQUIRED
- Disable Comments : REQUIRED
- Easy WP SMTP : RECOMMENDED
- Flamingo : REQUIRED
- W3 Total Cache : RECOMMENDED
- Wordfence : RECOMMENDED
- WP All Import Pro : RECOMMENDED
- WP All Import ACF add-on : RECOMMENDED
- WP Migrate DB : RECOMMENDED
- WPS Hide Login : REQUIRED
- Yoast SEO : REQUIRED

This could all be modify

### Working with GIT

Helpful links [Git simple guide](http://rogerdudler.github.io/git-guide/) and [Basic Git commands](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html).

#### New repository

1. cd /path/to/your/repo
2. Then create a local repository
  `git init`
3. Then create a repository on bitbucket. If it's a development of a new client, then you need to create a project first. If not, you just need to associate to a existing project. PS: To see all the projects, the owner must be "LegendaryPeople"
4. Connect your existing repository to Bitbucket
  `git remote add origin [your repository url]`
5. Then do your first commit.
  `git commit -am "First commit"`
  `git push origin master`

#### Workflow on git

The master is the branch that has all the working development. The initially you don't have to create branches, since your fist deploy will be with the working master.

After you do the first deploy, it's advisable that you work on a new branch instead overwrite the master.

Besides the master branch, we have two main branches. **production** and **develop**. Like the name said, the develop branch it's to development new features, modify previous development and all the workflow on development.
The production is the branch that it's gonna be deploy to the production environment.

[Helpful link](https://confluence.atlassian.com/bitbucketserver/using-branches-in-bitbucket-server-776639968.html)

##### Develop branch

1. cd /path/to/your/repo
2. Create development branch, if you already have a development branch skip this line. `git checkout -b develop`
3. Create a new feature branch `git checkout -b feature/new-feature-name` or bugfix previous feature `git checkout -b bugfix/feature-name`
4. After some development, you commit to this branch `git commit -am feature/new-feature-name`
5. After all the tests are made, merge with develop branch `git checkout develop` then `git merge feature/new-feature-name`
6. Then commit and push:
`git commit -am "merge feature/new-feature-name with develop"`
`git push --all origin` to push all branches or
`git push origin develop`


### Using Bedrock WP structure

Bedrock is a modern WordPress stack that helps you get started with the best development tools and project structure.

See github project here - [Bedrock](https://github.com/roots/bedrock)

#### Requirements

* PHP >= 5.6
* Composer - [Install](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)

#### Installation

1. Create a new project in a new folder for your project:

	`composer create-project roots/bedrock your-project-folder-name`

2. Update environment variables in `.env`  file:
	* `DB_NAME` - Database name
	* `DB_USER` - Database user
	* `DB_PASSWORD` - Database password
	* `DB_HOST` - Database host
	* `WP_ENV` - Set to environment (`development`, `staging`, `production`)
	* `WP_HOME` - Full URL to WordPress home (http://example.com)
	* `WP_SITEURL` - Full URL to WordPress including subdirectory (http://example.com/wp)
	* `AUTH_KEY`, `SECURE_AUTH_KEY`, `LOGGED_IN_KEY`, `NONCE_KEY`, `AUTH_SALT`, `SECURE_AUTH_SALT`, `LOGGED_IN_SALT`, `NONCE_SALT`

	If you want to automatically generate the security keys (assuming you have wp-cli installed locally) you can use the very handy [wp-cli-dotenv-command][wp-cli-dotenv]:

		wp package install aaemnnosttv/wp-cli-dotenv-command

		wp dotenv salts regenerate

	Or, you can cut and paste from the [Roots WordPress Salt Generator][roots-wp-salt].

3. Add theme(s) in `web/app/themes` as you would for a normal WordPress site.

4. Set your site vhost document root to `/path/to/site/web/` (`/path/to/site/current/web/` if using deploys) (if you are in dev mode, on .env file change the WP_HOME value)

5. Access WP admin at `http://example.com/wp/wp-admin`

#### Deploys

There are two methods to deploy Bedrock sites out of the box:

* [Trellis](https://github.com/roots/trellis)
* [bedrock-capistrano](https://github.com/roots/bedrock-capistrano)

Any other deployment method can be used as well with one requirement:

`composer install` must be run as part of the deploy process.

##### bedrock-capistrano deploy

1. Install ruby.
2. Install capistrano and capistrano-composer.
	It's highly suggest you to use budnler to manage them. To install bundler
	* Open ruby cmd prompt and run `gem install bundler`.
	* Once you have Bundler installed, run `bundle install` then `bundle exec cap install`.
3. Edit your config/deploy/stage/environment configs to set the roles/servers and connection options.
4. Before your first deploy, run `bundle exec cap <stage> deploy:check` to create the necessary folders/symlinks.
5. Add your `.env` file to `shared/` in your `deploy_to` path on the remote server for all the stages you use (ex: `/srv/www/example.com/shared/.env`).

### PHP CodeSniffer
PHP_CodeSniffer (https://github.com/squizlabs/PHP_CodeSniffer) is a set of two PHP scripts; the main phpcs script that tokenizes PHP, JavaScript and CSS files to detect violations of a defined coding standard, and a second phpcbf script to automatically correct coding standard violations.
PHP_CodeSniffer is an essential development tool that ensures your code remains clean and consistent.

#### Installation - PEAR
If you are running XAMPP (or equivalent), turn off apache and open the Shell, and run:
`pear install PHP_CodeSniffer`

Clone the WordPress standards repository (https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards):
`git clone -b master https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards.git wpcs`

Add it's path to the PHP_CodeSniffer configuration:
`phpcs --config-set installed_paths /path/to/wpcs`

And that's it

#### Run PHP_CodeSniffer
To validate the code:
`phpcs --standard=WordPress /path/to/a/file`

To fix a file:
`phpcbf --standard=WordPress /path/to/a/file`

### Gatsby on WordPress

First things first, you need to install gatsby globally, just run:
`npm install -g gatsby-cli`

To check if every thing it's fine, run:
`gatsby -v`

To create a new website, cd to the folder that you want to install Gatsby.
If you are using Bedrock structure, I recommend that you install on /app. if you are using the normal WP structure, you can install on ./ (where wp-config.php is).

After cd to that folder to install all gatsby components run:
`gatsby new your-folder-name`

Next, you need to install the gatsby WordPress package:
`npm install --save gatsby-source-wordpress`

Check this tutorial for more [instructions](https://www.youtube.com/watch?v=etii9yp1J6s)

Helpful links :

- [How To Build A Blog with Wordpress and Gatsby.js - Part 1](https://www.gatsbyjs.org/blog/2019-04-26-how-to-build-a-blog-with-wordpress-and-gatsby-part-1)
- [Watch and learn playlist tutorial](https://www.youtube.com/watch?v=etii9yp1J6s&list=PLUBR53Dw-Ef8fe-8xJXtMpd1-uhgd2Qa6)
- [Gatsby WordPress package](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/)
- [Getting Started with Gatsby and WordPress article](https://www.gatsbyjs.org/blog/2018-01-22-getting-started-gatsby-and-wordpress/#reach-skip-nav)
- [Gatsby Docs](https://www.gatsbyjs.org/docs/)

Licenses & Credits
=
- Font Awesome: http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)
- Bootstrap: http://getbootstrap.com | https://github.com/twbs/bootstrap/blob/master/LICENSE (Code licensed under MIT documentation under CC BY 3.0.)
- [Bedrock](https://github.com/roots/bedrock)
and of course
- jQuery: https://jquery.org | (Code licensed under MIT)
- WP Bootstrap Navwalker by Edward McIntyre: https://github.com/twittem/wp-bootstrap-navwalker | GNU GPL
- Bootstrap Gallery Script based on Roots Sage Gallery: https://github.com/roots/sage/blob/5b9786b8ceecfe717db55666efe5bcf0c9e1801c/lib/gallery.php
