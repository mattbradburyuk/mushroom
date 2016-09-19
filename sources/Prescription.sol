pragma solidity ^0.4.1;

// Prescription Contract

contract Prescription
{

    address doctor_id;
    address patient_id;

    struct Details {
        string drug;
        uint dose;
        string freq;
        uint num_days;
    }

    Details p_details;

	function Prescription(string _drug, uint _dose, string _freq, uint _num_days ) {
		doctor_id = msg.sender;
		p_details.drug = _drug;
		p_details.dose = _dose;
		p_details.freq = _freq;
		p_details.num_days = _num_days;
	}

    function set_drug(string drug) {p_details.drug = drug;}
    function set_dose(uint dose) {p_details.dose = dose;}
    function set_freq(string freq) {p_details.freq = freq;}
    function set_num_days(uint num_days) {p_details.num_days = num_days;}

    function get_drug() constant returns (string) { return p_details.drug;}
    function get_dose() constant returns (uint) { return p_details.dose;}
    function get_freq() constant returns (string) { return p_details.freq;}
    function get_num_days() constant returns (uint) { return p_details.num_days;}

}


