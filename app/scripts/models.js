var ArtObject = function(title, department) {
  var self = this;

  self.title = ko.observable(title);
  self.department = ko.observable(department);
};
