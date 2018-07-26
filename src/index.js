require('./master.scss');

const manticores = 'Manticores';

console.log(`We are ${manticores}`);

import manticoreimg from './images/manticore.png';
const manticore = document.getElementById('manticore-img');
if (manticore) manticore.src = manticoreimg;

// pattern is used in index.scss
import pattern from './images/pattern.png';
