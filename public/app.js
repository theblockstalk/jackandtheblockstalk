const BLOCK1_BODY = `
  <div align='center'>\
    <h4><a href="mailto:">jack @ jackandtheblockstalk dot com</a></h4>
    <div class='row'>\
      <div class='col-md-3'>\
        <div class='row'>\
          <a href='https://www.linkedin.com/in/jack-tanner/' target='blank'><img src='img/linkedin-logo.png' style='height:60px;'></a> \
        </div>\
        <div class='row'>\
          <h5><a href='https://www.linkedin.com/in/jack-tanner/' target='blank'>LinkedIn</a></h5>\
        </div>\
      </div>\
      <div class='col-md-3'>\
        <div class='row'>\
          <a href='https://github.com/theblockstalk' target='blank'><img src='img/github-logo.png' style='height:60px;'></a>\
        </div>\
        <div class='row'>\
          <h5><a href='https://github.com/theblockstalk' target='blank'>Github</a></h5>\
        </div>\
      </div>\
      <div class='col-md-3'>\
        <div class='row'>\
          <a href='https://twitter.com/@theblockstalk' target='blank'><img src='img/twitter.png' style='height:60px;'></a>\
        </div>\
        <div class='row'>\
          <h5><a href='https://twitter.com/@theblockstalk' target='blank'>Twitter</a></h5>\
        </div>\
      </div>\
      <div class='col-md-3'>\
        <div class='row'>\
          <a href='https://medium.com/@theblockstalk' target='blank'><img src='img/medium-logo.png' style='height:60px;'></a>\
        </div>\
        <div class='row'>\
          <h5><a href='https://medium.com/@theblockstalk' target='blank'>Blog</a></h5>\
        </div>\
      </div>\
    </div>\
  </div>\
  <h6><br></h6>`;

const BLOCK2_BODY = `
  <h4>Blockchain and <a href='https://en.wikipedia.org/wiki/Self-sovereign_identity'>SSI</a> engineer at <a href='https://www.gimly.io' target='blank'>Gimly Blockchain Projects</a></h4>\
  <h4>Visionary of <a href='https://bit.ly/digitalSociety' target='blank'>Digital Societies</a></h4>\
  <h4>Contributor of <a href='https://medium.com/coinmonks/difference-between-eosio-software-and-eos-blockchain-13bcc57d1d9d' target='blank'>EOSIO technology community</a></h4>\
  <h4>Critically thinking about <a href='https://medium.com/@theblockstalk/the-biggest-problems-of-bitcoin-that-people-are-not-speaking-about-8ce2493e9609' target='blank'>Cryptocurrencies</a></h4>\
  <h4><br></h4>`;

const BLOCK3_BODY = `
  <h4>Smart contract development</h4>\
  <h4>Blockchain app architecture</h4>\
  <h4>Technical workshops</h4>\
  <h4>Identity research</h4>\
  <h4>Project/product management</h4>`;

const PREVIOUS_HASH_0 = "0000000000";
const blockdata = [{
        name: "block0",
        title: "Find me",
        body: BLOCK1_BODY,
    },
    {
        name: "block1",
        title: "What I work on",
        body: BLOCK2_BODY,
    },
    {
        name: "block2",
        title: "What else I do",
        body: BLOCK3_BODY,
    },
];

const VALID_COMPARE = '00';

function nextNonce(_nonce, _i) {
    // console.log('Trying nonce ' + _nonce + ' for block ' + _i);
    var jname = '#' + blockdata[_i].name;

    // Try a new hash and check if the first few characters are 0's
    var blockHash = Sha256.hash(blockdata[_i].name + _nonce);
    var validString = blockHash.substr(0, VALID_COMPARE.length);
    var totalString = blockHash.substr(0, 10);
    $(jname + ' .nonce').text(_nonce);
    $(jname + ' .final-hash').text(totalString);

    if (validString != VALID_COMPARE && _nonce < 1000000) {
        // Correct hash not found, 'block not valid'
        newNonce = _nonce + 1;
        setTimeout(function() { nextNonce(newNonce, _i); }, 1)
    } else {
        console.log('Finished mining block ' + _i);
        makeBlock(_i + 1);
    }
}

function makeBlock(i) {
    console.log('Making block ' + i);
    // If there are no more blocks then finish
    if (i < blockdata.length) {
        var jname = '#' + blockdata[i].name;

        // Fade in the block
        $(jname).fadeIn('slow', () => {

            // Fade in the nonce, previous and final has
            $.when($(jname + ' .block-title-box, ' + jname + ' .block-final-box').fadeOut(0)).done(() => {
                // $(jname + ' .block-title-box, ' + jname + ' .block-final-box').fadeOut(0, () => {
                // Set the title box with 0 nonce and previous hash
                var titleData;
                if (i == 0)
                    titleData = "<div class='box-title'><h2 align='center' class='box-title'><br></h2></div><span class='light-text'>\
            Previous Hash: <span class='prev-hash'>" + PREVIOUS_HASH_0 + "</span><br>Nonce: <span class='nonce'>0</span><span>";
                else {
                    let jnamePrev = '#' + blockdata[i - 1].name
                    var prevHash = $(jnamePrev + ' .final-hash').text();
                    titleData = "<div class='box-title'><h2 align='center' class='box-title'><br></h2></div><span class='light-text'>\
            Previous Hash: <span class='prev-hash'>" + prevHash + "</span><br>Nonce: <span class='nonce'>0</span><span>";
                }
                $(jname + ' .block-title-box').html(titleData);
                // Set the final box with dummy final hash
                var finalData = "<span class='light-text'>Hash: <span class='final-hash'>ffffffffff</span></span>";
                $(jname + ' .block-final-box').html(finalData);

                $.when($(jname + ' .block-title-box, ' + jname + ' .block-final-box').fadeIn('slow')).done(() => {
                    // $(jname + ' .block-title-box, ' + jname + ' .block-final-box').fadeIn(2000, () => {
                    // Fade in the title and the body
                    $.when($(jname + ' .block-title-box .box-title, ' + jname + ' .block-body-box').fadeOut(0)).done(() => {
                        // $(jname + ' .block-title-box .box-title, ' + jname + ' .block-body-box').fadeOut(0, () => {
                        // Set the title box with title
                        var titleData = "<h2 align='center'>" + blockdata[i].title + "</h2>";
                        $(jname + ' .block-title-box .box-title').html(titleData);
                        // Set the body box with body html
                        $(jname + ' .block-body-box').html(blockdata[i].body);

                        $.when($(jname + ' .block-title-box .box-title, ' + jname + ' .block-body-box').fadeIn('slow')).done(() => {
                            // $(jname + ' .block-title-box .box-title, ' + jname + ' .block-body-box').fadeIn(2000, () => {
                            // Go through nonces and check if final hash is valid
                            console.log('Starting mine block ' + i);
                            nextNonce(0, i);
                            // makeBlock(i+1);
                        })
                    })
                })
            })
        })
    }

}

function blockchain() {
    makeBlock(0);
}

function blockchain_old() {
    var jname = '#block0';
    // Fade in the block
    $(jname).fadeIn('slow', () => {

        // Fade in the nonce, previous and final has
        $(jname + ' .block-title-box, ' + jname + ' .block-final-box').fadeOut(0, () => {
            // Set the title box with 0 nonce and previous hash
            var titleData = "<div class='box-title'><h2 align='center' class='box-title'><br></h2></div><span class='light-text'>Previous Hash: <span class='prev-hash'>" + PREVIOUS_HASH_1 + "</span><br>Nonce: <span class='nonce'>0</span><span>";
            $(jname + ' .block-title-box').html(titleData);
            // Set the final box with dummy final hash
            var finalData = "<span class='light-text'>Hash: <span class='final-hash'>ffffffffff</span></span>";
            $(jname + ' .block-final-box').html(finalData);

            $(jname + ' .block-title-box, ' + jname + ' .block-final-box').fadeIn('slow', () => {

                // Fade in the title and the body
                $(jname + ' .block-title-box .box-title, ' + jname + ' .block-body-box').fadeOut(0, () => {
                    // Set the title box with title
                    var titleData = "<h2 align='center'>" + blockdata[0].title + "</h2>";
                    $(jname + ' .block-title-box .box-title').html(titleData);
                    // Set the body box with body html
                    $(jname + ' .block-body-box').html(blockdata[0].body);

                    $(jname + ' .block-title-box .box-title, ' + jname + ' .block-body-box').fadeIn('slow', () => {

                        // Go through nonces and check if final hash is valid
                        nextNonce(0, 0, jname, blockdata[0].name);
                        // makeBlock(i+1);
                    })
                })
            })
        })
    })
}