(function($) {

  $.fn.treeViewPlus = function(options) {

    var data = [{
      "txt": "1",
      "children": [{
        "txt": "1"
      }, {
        "txt": "2"
      }]
    }, {
      "txt": "2",
      "children": [{
        "txt": "1",
        "children": [{
          "txt": "1"
        }, {
          "txt": "2"
        }]
      }, {
        "txt": "2"
      }]
    }, {
      "txt": "3",
      "children": []
    }];

    var parent = -1;
    var level = 0;
    var id = 0;
    var ul = $("<ul>");
    var tree = $("#tree");
    tree.addClass("tree");
    var toLoad = 2;
    var openedClass = 'glyphicon-minus-sign';
    var closedClass = 'glyphicon-plus-sign';

    var settings = $.extend({
      url: "localhost:8080/api/getTreeView?level=2"
    });

    var generateList = function(data, list) {
      let index = 0;
      for (var i = 0; i < data.length; i++) {
        var li = $("<li>");
        var atr = {
          "data-index": index,
          "data-parent": parent,
          "data-level": level,
          "data-id": id
        };
        id++;
        li.text(data[i].txt).attr(atr);
        if (data[i].children && data[i].children.length) {
          li.addClass("branch");
          parent++;
          level++;
          if(level < toLoad){
            var subl = $("<ul>");
            generateList(data[i].children, subl);
            li.append(subl);
          } else {
            li.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
          }
          parent--;
          level--;
        }
        index++;
        list.append(li);
      }

      return list;

    };

    tree.append(generateList(data, ul));

    var getData = function (url, level) {

    }

    tree.find(".branch .indicator").each(function () {
      $(this).on('click',function (e) {
        tree = $(this);
        var t = tree;
        e.preventDefault();
        ul = $("<ul>");
        tree.append(generateList(data,ul));
        t.addClass(openedClass);
      });
    });

  };

}(jQuery));
