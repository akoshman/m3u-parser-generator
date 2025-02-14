import {M3uMedia, M3uParser, M3uPlaylist} from "../src";
import {complex, extGroupDirectiveOrder} from "./test-m3u";

describe('Parse and generate test', () => {
    it('should be same as original after parse and generate', () => {
        expect(M3uParser.parse(complex).getM3uString()).toEqual(complex);
    });

    it('should be parsed when random order of #EXTGRP directive is present', () => {
        const parsed = M3uParser.parse(extGroupDirectiveOrder);
        expect(parsed.medias[0].group).toEqual('Test TV group 1');
        expect(parsed.medias[1].group).toEqual('Test TV group 2');
    });

    it('should raise exception when first line is missing', () => {
        const stringWithoutFirstLine = extGroupDirectiveOrder.split('\n').slice(1).join('\n');
        expect(() => M3uParser.parse(stringWithoutFirstLine)).toThrow(new Error('Missing #EXTM3U directive!'));
    });

    it('should generate without playlist title', () => {
        const playlist = new M3uPlaylist();
        playlist.medias.push(new M3uMedia('location'));
        expect(playlist.getM3uString()).toEqual('#EXTM3U\nlocation');
    });
});
