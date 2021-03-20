pragma solidity ^0.4.26;
pragma experimental ABIEncoderV2;

contract Tweets {
    uint256 timestamp;
    string text;
    address sender;

    function Tweets(string _text) {
        sender = tx.origin;
        timestamp = block.timestamp;
        text = _text;
    }

    function getall()
        returns (
            string,
            uint256,
            address
        )
    {
        return (text, timestamp, sender);
    }

    function get_text() returns (string) {
        return text;
    }

    function get_timestamp() returns (uint256) {
        return timestamp;
    }

    function get_sender() returns (address) {
        return sender;
    }
}

contract App {
    address[] Tweets_list;
    uint256 Tweets_list_length;

    function get_Tweets_list_length() returns (uint256) {
        return Tweets_list_length;
    }

    //event NewJobs(address creater); //todo loop and fill out fields

    function get_Tweets_N(uint256 index)
        returns (
            string,
            uint256,
            address
        )
    {
        return Tweets(Tweets_list[index]).getall();
    }

    struct UserInfo {
        address owner;
        bool exists;
        address[] Tweets_list;
        uint256 Tweets_list_length;
    }
    mapping(address => UserInfo) public user_map;
    address[] UserInfoList;
    uint256 UserInfoListLength;

    event NewTweets(address sender);

    function new_Tweets(string text) returns (address) {
        address mynew = address(new Tweets({_text: text}));
        if (!user_map[tx.origin].exists) {
            user_map[tx.origin] = create_user_on_new_Tweets(mynew);
        }
        user_map[tx.origin].Tweets_list.push(mynew);

        Tweets_list.push(mynew);
        Tweets_list_length += 1;

        emit NewTweets(tx.origin);

        return mynew;
    }

    function create_user_on_new_Tweets(address addr)
        private
        returns (UserInfo)
    {
        address[] storage Tweets_list;
        UserInfoList.push(addr);
        return
            UserInfo({
                exists: true,
                owner: addr,
                Tweets_list: Tweets_list,
                Tweets_list_length: 0
            });
    }
}
