contract LegitLit{

    enum Status { InProcess, Accepted, Rejected }

    struct Paper{
        //mapping(address => bool) peerReviewers;
        //mapping(address => bool) hasReviewed;
        uint totalAccepts;
        uint totalRejects;
        string paper_id;
        string[] reviews;
        Status currStatus;
        bool exists;
        uint numReviewers;
    }

    mapping (string => Paper) allPapers;
    address owner;

    modifier paperExists(string _id) {
        if (!allPapers[_id].exists) throw;
        _
    }

    function LegitLit(){
        owner = msg.sender;
    }

    function test() constant returns (uint){
        return 8;
    }


    //other input: address[] _peerReviewers
    function submitPaper(string _paper_id) returns (string id){

        Paper memory newP;
        newP.totalAccepts = 0;
        newP.totalRejects = 0;
        newP.paper_id = _paper_id;
        newP.currStatus = Status.InProcess;
        newP.exists = true;
        newP.numReviewers = 2;

        allPapers[_paper_id] = newP;

        return allPapers[_paper_id].paper_id;

        //for (uint i = 0; i < _peerReviewers.length; i++) {
        //    if ((msg.sender) == _peerReviewers[i]){
        //        throw;
        //    }
        //    allPapers[_paper_id].peerReviewers[_peerReviewers[i]] = true;
        //}

    }

    //function that adds to totalAccepts and adds a review
    function acceptPaper(string _paper_id, string _review) { //paperExists(_paper_id){

        Paper currPaper = allPapers[_paper_id];

        //if (currPaper.currStatus != Status.InProcess){
        //    throw;
        //}

        //if ((!currPaper.peerReviewers[msg.sender]) || (currPaper.hasReviewed[msg.sender])){
        //    throw;
        //}

        //currPaper.reviews.push(_review);
        //currPaper.totalAccepts += 1;
        //currPaper.hasReviewed[msg.sender] = true;

        //checkStatus(_paper_id);
    }

    //function that adds to total rejects and adds a review
    function rejectPaper(string _paper_id, string _review) { //paperExists(_paper_id){

        Paper currPaper = allPapers[_paper_id];

        //if (currPaper.currStatus != Status.InProcess){
        //    throw;
        //}

        //if ((!currPaper.peerReviewers[msg.sender]) || (currPaper.hasReviewed[msg.sender])){
        //    throw;
        //}

        //currPaper.reviews.push(_review);
        //currPaper.totalRejects += 1;
        //currPaper.hasReviewed[msg.sender] = true;

        //checkStatus(_paper_id);

    }

    //check if the review process is over and changes the status if it is.
    function checkStatus(string _paper_id) paperExists(_paper_id) private {

        Paper currPaper = allPapers[_paper_id];

        if (currPaper.reviews.length >= currPaper.numReviewers){
            if(currPaper.totalAccepts > currPaper.totalRejects){
                currPaper.currStatus = Status.Accepted;
            }
            else{
                currPaper.currStatus = Status.Rejected;
            }
        }
    }
}
