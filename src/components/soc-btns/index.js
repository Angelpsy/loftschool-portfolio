import './index.scss';
import vkSvg from './assets/vk.svg';
import githubSvg from './assets/github.svg';
import inSvg from './assets/in.svg';

import {replacementViewbox} from 'src/common/scripts/helpers/svg';

[
    {
        id: 'vk',
        symbol: vkSvg,
    },
    {
        id: 'github',
        symbol: githubSvg,
    },
    {
        id: 'in',
        symbol: inSvg,
    },
].forEach((item) => {
    replacementViewbox(item.id, item.symbol);
});
