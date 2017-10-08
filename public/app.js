
function blockchain() {
  // window.alert("sometext");
  $("#block1").fadeIn("slow", () => {
    const VALID_COMPARE = "00";
    var validString;
    var i = 0;
    var nonce = parseInt($("#block1 .nonce").text());
    function nextNonce(_nonce, _i) {
      console.log(_nonce);
      var blockHash = Sha256.hash('block1' + _nonce);
      console.log(blockHash);
      validString = blockHash.substr(0,VALID_COMPARE.length);
      // console.log(validString);
      // console.log(validString == VALID_COMPARE);
      var totalString = blockHash.substr(0,10);
      // console.log(totalString);
      $("#block1 .nonce").text(_nonce);
      $("#block1 .final-hash").text(totalString);
      if( validString != VALID_COMPARE && i < 1000000 ) {
        newi = _i+1;
        newNonce = _nonce+1;
        setTimeout(nextNonce(newNonce, newi), 100)
      }
    }
    nextNonce(nonce, i);
    // setTimeout(nextNonce(), 10)
    // do {
    //   // console.log(nonce);
    //   var blockHash = Sha256.hash('block1' + nonce);
    //   // console.log(blockHash);
    //   validString = blockHash.substr(0,VALID_COMPARE.length);
    //   // console.log(validString);
    //   // console.log(validString == VALID_COMPARE);
    //   var totalString = blockHash.substr(0,10);
    //   // console.log(totalString);
    //   i++;
    //   nonce++;
    //   $("#block1 .nonce").text(nonce);
    //   $("#block1 .final-hash").text(totalString);
    // } while (validString != VALID_COMPARE && i < 1000000);

    $("#block2").fadeIn("slow", () => {
      $("#block3").fadeIn("slow", () => {
      })
    })
  });
}
