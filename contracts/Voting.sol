//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Voting {
    address public admin;
    struct Choice{
        uint256 choiceId;
        string choiceTitle;
        uint256 choiceCount;
    }
    struct Ballot{
        uint256 ballotId;
        string ballotTitle;
        uint256 ballotEnd;
        Choice[] ballotChoices;
    }
    mapping(address => bool) public voters;
    mapping(address => mapping(uint256 => bool)) public voterToBallotVoted;
    mapping(uint256 => Ballot) public idToBallot;
    uint256 public nextBallotId;

    modifier onlyAdmin {
        require(admin == msg.sender, "Only Admin allowed");
        _;
    }
    constructor (){
        admin = msg.sender;
    }
    function addVoters(address[] memory _voters) public onlyAdmin {
        for(uint256 i =0; i<_voters.length; i++) {
            voters[_voters[i]] = true;
        }
    }
    function createBallot(
        string memory _ballotTitle,
        uint256 _offset,
        string[] memory _choices
        ) external onlyAdmin {
            idToBallot[nextBallotId].ballotId = nextBallotId;
            idToBallot[nextBallotId].ballotTitle = _ballotTitle;
            idToBallot[nextBallotId].ballotEnd = block.timestamp + _offset;
            for(uint256 i=0; i<_choices.length; i++){
                idToBallot[nextBallotId].ballotChoices.push(Choice(
                    i, _choices[i], 0
                ));
            }
            nextBallotId++;
    }
    function getBallot(uint256 _ballotId)external view returns(Ballot memory) {
        return idToBallot[_ballotId];
    }
     function vote(uint256 _ballotId, uint256 _choiceId) external {
        require(voters[msg.sender] == true, "Only Voter Allowed");
        require(voterToBallotVoted[msg.sender][_ballotId] == false, "Voter can Vote only once per Ballot");        
        require(idToBallot[_ballotId].ballotEnd > block.timestamp, "Ballot ended");                
        idToBallot[_ballotId].ballotChoices[_choiceId].choiceCount++;
        voterToBallotVoted[msg.sender][_ballotId] = true;
    }
}
