exports.handler = async (event, handler) => {
    const converter = require("liquid-to-handlebars");
    
    let processedData = converter.convert(JSON.parse(event.body).data);
    let decodedData = decodeURIComponent(processedData);
  
    // 正则修复语法
    // 注释
    decodedData = decodedData.replace(/\{{#comment}}/g, "{{! ");
    decodedData = decodedData.replace(/\{{\/comment}}/g, " }}");
  
    // json
    decodedData = decodedData.replace(
      /{{json\s(.*?)}}/g,
      "{{{ JSONstringify $1 }}}"
    );
  
    // include
    decodedData = decodedData.replace(/{{include\s(.*?)}}/g, `{{snippet $1}}`);
  
    // properties
    decodedData = decodedData.replace(
      /(|'|")properties\[(.*?)\](|'|")\s*:\s*(.*?)(,|$)/g,
      function (match, holder, key, holder, value) {
        return (
          "properties:[{type: 'text', name: \"" + key + '", value: ' + value + "}]" + (match.endsWith(",") ? "," : "")
        );
      }
    );
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: decodedData,
      }),
    };
  };
  