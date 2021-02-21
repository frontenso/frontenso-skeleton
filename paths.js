module.exports = {
  build: {
    html: 'build',
    scripts: 'build/assets/js/',
    styles: 'build/assets/css/',
    images: 'build/assets/images/',
    fonts: 'build/assets/fonts/',
    sprites: 'build/assets/images/sprites/',
    svg: 'build/assets/svg/',
    videos: 'build/assets/video/',
    public: 'build/',
  },
  src: {
    templates: './src/assets',
    nunj: 'src/assets/templates/pages/**/*.nunj',
    scripts: 'src/assets/js/index.js',
    styles: 'src/assets/sass/styles.scss',
    images: 'src/assets/images/**/*.*',
    imagesInline: 'src/assets/images/inline/',
    fonts: 'src/assets/fonts/**/*.*',
    sprites: 'src/assets/images/sprites/*.png',
    svg: 'src/assets/svg/**/*.svg',
    videos: 'src/assets/video/**/*.*',
    public: 'src/assets/public/**/*.*',
  },
  watch: {
    nunj: ['src/assets/**/*.nunj', 'global-data.json'],
    scripts: 'src/assets/js/**/*.js',
    styles: 'src/assets/**/*.{sass,scss}',
    images: 'src/assets/images/**/*.*',
    fonts: 'src/assets/fonts/**/*.*',
    sprites: 'src/assets/images/sprites/*.png',
    svg: 'src/assets/svg/**/*.svg',
    videos: 'src/assets/video/**/*.*',
    public: 'src/assets/public/**/*.*',
  },
  clean: 'build/',
};
