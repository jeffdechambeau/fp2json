function sendJSONToPython(jsonData) {
  google.colab.kernel.invokeFunction('namespace.get_json_data', [jsonData], {});
}
function sendToPython(name, data) {
  google.colab.kernel.invokeFunction(`namespace.${name}`, [data], {});
}
