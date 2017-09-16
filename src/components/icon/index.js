import './index.scss';
import vkSvg from './assets/vk.svg';
import githubSvg from './assets/github.svg';
import inSvg from './assets/in.svg';
import arrowDownSvg from './assets/arrow_down.svg';
import aboutHeaderSvg from './assets/about_header.svg';
import skypeSvg from './assets/skype.svg';
import envelopeSvg from './assets/envelope.svg';
import phoneSvg from './assets/phone.svg';
import mapMarkerSvg from './assets/map_marker.svg';

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
    {
        id: 'arrow_down',
        symbol: arrowDownSvg,
    },
    {
        id: 'about_header',
        symbol: aboutHeaderSvg,
    },
    {
        id: 'skype',
        symbol: skypeSvg,
    },
    {
        id: 'envelope',
        symbol: envelopeSvg,
    },
    {
        id: 'phone',
        symbol: phoneSvg,
    },
    {
        id: 'map_marker',
        symbol: mapMarkerSvg,
    },
].forEach((item) => {
    replacementViewbox(item.id, item.symbol);
});
