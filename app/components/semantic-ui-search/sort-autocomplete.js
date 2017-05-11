function sortAutocomplete(query, targetParam, array) {
  if (!array || array.length == 0) return [];
  if (array.length == 1) return array;

  var sortByTarget = function(a, b) {
    var diff = (a[targetParam].toLowerCase() < b[targetParam].toLowerCase());
    return diff === true ? -1 : 1;
  }

  var startsWithQuery = function(obj) {
    return obj[targetParam].substr(0, query.length).toLowerCase() === query.toLowerCase();
  }

  var beginsWithQueryParam = array.filter(startsWithQuery).sort(sortByTarget);
  var doNotBeginsWithQueryParam = array.filter(function(obj) { return !startsWithQuery(obj); }).sort(sortByTarget);

  var result = beginsWithQueryParam.concat(doNotBeginsWithQueryParam);

  return result;
}
