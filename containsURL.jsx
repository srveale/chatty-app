// const containsURL = function (content){

//   splitContent = content.split(' ');
//   splitContent.forEach(function (word) {
//     console.log('word', word);
//     if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(word)) {
//       return word;
//     }
//   });
//   return false;
// };

// console.log(containsURL('http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'))


const getURL = function (content) {
  let result = false;
  content.split(' ').forEach(function (word) {
    var match = word.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);

    if (match) {
      result = word;
    }

  })
  return result
}

console.log('final result', getURL('butts and more butts http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'))
        // return match && {
        //     protocol: match[1] || '',
        //     host: match[2] || '',
        //     hostname: match[3] || '',
        //     port: match[4] || '',
        //     pathname: match[5] || '',
        //     search: match[6] || '',
        //     hash: match[7] || ''