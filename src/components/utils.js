// FIXME deal with the Error stuff
function postRequest(target, vars) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('POST', target, true);
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.onload = function() {
      if (request.status === 200) {
        resolve(request.responseText);
      } else {
        reject({ 
          status: request.statusText, 
          response: request.reponseText,
        });
      }
    };

    request.onerror = function() {
      reject(Error("Network Error"));
    };

    request.send(JSON.stringify(vars));
  });
};

function formatDollars(number)
{
  number = number.toFixed(2) + '';
  const x = number.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1,$2');
  }
  return x1 + x2;
}

function formatRelativeDollars(adjustment) {
  if (adjustment && adjustment !== 0) {
    const sign = adjustment < 0 ? '-' : '+';
    return ` [${sign}$${formatDollars(adjustment)}]`;
  }
  return '';
}

export {
  postRequest,
  formatDollars,
  formatRelativeDollars,
};
