// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AuditBadgeNFT is ERC721URIStorage {
    uint256 private _nextTokenId;

    // Events
    event BadgeMinted(address indexed to, uint256 indexed tokenId, string uri);

    constructor() ERC721("AuditLinkAI Badge", "AUDIT") {
        _nextTokenId = 1;
    }

    // Anyone can mint a badge with a custom URI
    function mintBadgeWithURI(address to, string memory uri) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit BadgeMinted(to, tokenId, uri);
        return tokenId;
    }

    // Optional: Anyone can mint with a default URI (not recommended for production)
    function mintBadge(address to) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        string memory uri = string(abi.encodePacked(
            "https://gateway.pinata.cloud/ipfs/QmYourHashHere/",
            Strings.toString(tokenId),
            ".json"
        ));
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit BadgeMinted(to, tokenId, uri);
        return tokenId;
    }

    function totalSupply() public view returns (uint256) {
        return _nextTokenId - 1;
    }

    // Required overrides
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
