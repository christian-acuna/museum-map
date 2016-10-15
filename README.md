# Lens of China: Neighborhood Map
This app searches Baidu API for 20 popular tourist attractions in a chosen city (Hong Kong, Beijing, Shanghai, and Tianjin) and populates their location on a Google map. It dynamically generates a list of tags in Chinese for these locations  and uses Google Translate API to provide English translations. You can filter the locations by tags. Clicking on a location creates a popup that provides more detailed information such as the address, Baidu rating, price, hours, and picture. Also, if a google street view image is available, it will appear in the left sidebar. Once a city is selected, you can view art and photography associated with this city from the Harvard Art Museum and J. Paul Getty Museum.

## Install
1. Clone or fork repo
2. Run `npm install` && `bower install`
3. Use `gulp serve` to launch development server
4. Type `gulp` to clean dist folder and run a build process
5. `gulp serve:dist` launches browser-sync production server

### Issues

The Harvard API's HTTPS certificate is not valid and fails when the site is hosted on an https server. The JSON responses are stored in json folder and are used when the first AJAX response fails. Also, street view images for locations other than Hong Kong are lacking due to Google being blocked in China. I tried using Baidu panorama for locations in China but could not find API documentation for loading a pano based on a radius search like the Google API.

### License

This game is released under the [MIT License](http://www.opensource.org/licenses/MIT).
