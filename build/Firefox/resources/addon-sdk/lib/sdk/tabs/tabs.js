/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

module.metadata = {
  'stability': 'unstable'
};

if (require('../system/xul-app').is('Firefox')) {
  module.exports = require('./tabs-firefox');
}
else if (require('../system/xul-app').is('Fennec')) {
  module.exports = require('../windows/tabs-fennec').tabs;
}
else {
  throw new Error([
    'The tabs module currently supports only Firefox & Fennec. In the future',
    ' we would like it to support other applications, however.'
  ].join(''));
}
