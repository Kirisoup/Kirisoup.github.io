    root/**.md
    - _layout/**.html
      - _includes/**.html
        - _data/**.yaml
      - assets/css/**.scss
        - _sass/**.scss (main.scss)


# `_layout/**.html`



## Page Content: 

### *#`_layout/**.html`*

Use `{{ content }}` in layout html to specify where the content should be inserted:

    <body>
      {{ content }}
    </body>

### `root/**.md` or `root/**/**.md`

include `layout: ***` in front matter

    ---
    layout: default
    ---



## Includes 

Reusable elements

### *#`_layout/**.html`*

Use `{% include **.html %}`

    <body>
          {% include navigation.html %}
          {{ content }}
    </body>

### `_includes/**.html`

    <nav>
      {% for item in site.data.navigation %}
        <a href="{{ item.link }}" {% if page.url == item.link %}class="youreHere"{% endif %}>
          {{ item.name }}
        </a>
      {% endfor %}
    </nav>



## Data

Data for generating repetitive elements 

### `**.html` or `**.md`

    {% for item in site.data.navigation %}
      <a href="{{ item.link }}" {% if page.url == item.link %}class="youreHere"{% endif %}>
        {{ item.name }}
      </a>
    {% endfor %}

### `_data/**.yaml`

    - name: Home
      link: /
    - name: About
      link: /about.html



## Style Sheet

### *#`_layout/**.html`*

Specify style sheet with `<link rel="stylesheet" href="*LOCATION*">`

**Use \*\*.css instead of \*\*.scss**

    <head>
      <link rel="stylesheet" href="/assets/css/default.css">
    </head>

### `assets/css/**.scss`

Import style sheet which is reused site-wise: 

    @import "main";

#### `_sass/**.scss (main.scss)`

Styles that are applied site-wise (e.g. background color, font etc.)
