'use strict';

describe('Directive: Boolean Input', function () {

  it('should return an empty array when array has zero elements', function() {
    expect(sortAutocomplete('tes', 'description', []).length).toBe(0);
  });

  it('should return the same array when it has one element', function() {
    var result = sortAutocomplete('tes', 'description', [{id: 1, description: 'teste'}]);
    expect(result.length).toBe(1);
    expect(result[0].description).toBe('teste');
  });

  it('should return the same array when it has two ordered elements', function() {
    var result = sortAutocomplete('tes', 'description', [{id: 1, description: 'teste'}, {id: 2, description: 'ztest'}]);
    expect(result.length).toBe(2);
    expect(result[0].description).toBe('teste');
    expect(result[1].description).toBe('ztest');
  });

  it('should return the reverse array when it has two unordered elements', function() {
    var result = sortAutocomplete('tes', 'description', [{id: 1, description: 'ztest'}, {id: 2, description: 'teste'}]);
    expect(result.length).toBe(2);
    expect(result[0].description).toBe('teste');
    expect(result[1].description).toBe('ztest');
  });

  it('should return the same array when it has two ordered elements begining with query string', function() {
    var result = sortAutocomplete('tes', 'description', [{id: 1, description: 'testA'}, {id: 2, description: 'testB'}]);
    expect(result.length).toBe(2);
    expect(result[0].description).toBe('testA');
    expect(result[1].description).toBe('testB');
  });

  it('should return the reverse array when it has two unordered elements begining with query string', function() {
    var result = sortAutocomplete('tes', 'description', [{id: 1, description: 'testB'}, {id: 2, description: 'testA'}]);
    expect(result.length).toBe(2);
    expect(result[0].description).toBe('testA');
    expect(result[1].description).toBe('testB');
  });

  it('should return the same array when it has two ordered elements matching with query string', function() {
    var result = sortAutocomplete('tes', 'description', [{id: 1, description: 'Atest'}, {id: 2, description: 'Btest'}]);
    expect(result.length).toBe(2);
    expect(result[0].description).toBe('Atest');
    expect(result[1].description).toBe('Btest');
  });

  it('should return the reverse array when it has two unordered elements matching with query string', function() {
    var result = sortAutocomplete('tes', 'description', [{id: 1, description: 'Btest'}, {id: 2, description: 'Atest'}]);
    expect(result.length).toBe(2);
    expect(result[0].description).toBe('Atest');
    expect(result[1].description).toBe('Btest');
  });

});
