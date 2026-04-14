//Takes req.body from frontend, if the object is nested, this function flattens it with dot notation
// Nested object as below, overwrites everything (findByIdAndUpdate) what's in overview
// {
// 	"overview": {
// 		"brand": "Scott"
// 	}
// }
// outcome => "overview.brand": "Scott",

//obj => req.body (field which requires modification)
// prefix and result has default values
export function flatten(obj, prefix = "", result = {}) {
  //Go through each key => overview, name etc
  for (let key in obj) {
    //if nested, returns object, if not returns value (string)
    const value = obj[key];
    //"" (empty string) returns false, the first call is always false
    const newKey = prefix ? `${prefix}.${key}` : key;

    //arrays have it's own method in mongoose, therefore it's excluded from here
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      //if true, runs the flatten function again with new values
      //to evaluate if there is another nested level
      flatten(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}
