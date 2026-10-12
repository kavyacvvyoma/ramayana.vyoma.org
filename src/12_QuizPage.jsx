// ════════════════════════════════════════════════════════════════════════════
//  11_QuizPage.jsx  —  nav: "Quiz & Certifications"
// ════════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import { createPortal } from "react-dom";
import { C, F } from "./01_theme";
import { Card, Tag, Btn, Divider, PageHdr } from "./02_SharedComponents";

const YOUTUBE_URL           = "https://www.youtube.com/playlist?list=PLmozlYyYE-EQtZaTjtmmL8l238faWFrRU";
const REGISTER_SANKALPA_URL = "https://www.sanskritfromhome.org/course-details/SrimadValmikiRamayanaNavahaOnlineParayanaPravacana-49025";
const QUIZ_REGISTER_URL     = "https://tinyurl.com/RP-P26";
const QUIZ_INSTRUCTIONS_URL = "https://tinyurl.com/wkphcdbn";
const QUIZ_END_DATE         = "6 April 2026, 10:00 AM (IST)";

export function QuizPage() {
  const [modalOpen, setModalOpen] = useState(null); // 'parayana' | 'result'

const PARTICIPANTS_2025 = [
  // A+ Grade (90-100)
  { name: "Perindevi Behara",       marks: 96, grade: "A+" },
  { name: "Srinivasa Rao M",        marks: 94, grade: "A+" },
  { name: "Sachi R. Sachidananda",  marks: 93, grade: "A+" },
  { name: "SHRI BHAVYA KAILASAM",   marks: 92, grade: "A+" },
  { name: "Arpith",                  marks: 90, grade: "A+" },
  { name: "Sankari Ramesh",          marks: 90, grade: "A+" },
  { name: "Urvashi Sharma",          marks: 90, grade: "A+" },
  // A Grade (80-89)
  { name: "SRINIVASARAO MADHURAKAVI", marks: 89, grade: "A" },
  { name: "Sangeerth P",              marks: 89, grade: "A" },
  { name: "pvr sirisha",              marks: 89, grade: "A" },
  { name: "Priya123",                 marks: 89, grade: "A" },
  { name: "K N Kamala",              marks: 89, grade: "A" },
  { name: "Chitra Srikanth",         marks: 89, grade: "A" },
  { name: "sridevi p",               marks: 88, grade: "A" },
  { name: "P Ramesh",                marks: 88, grade: "A" },
  { name: "MeenakshiR",              marks: 88, grade: "A" },
  { name: "Jaya Lakshmi",            marks: 88, grade: "A" },
  { name: "Prathusha PVL",           marks: 87, grade: "A" },
  { name: "Mythu Kasthurirangan",    marks: 87, grade: "A" },
  { name: "Lanka Suryakantham",      marks: 87, grade: "A" },
  { name: "Hridhaan",                marks: 87, grade: "A" },
  { name: "Bhargavi MK",             marks: 87, grade: "A" },
  { name: "Vimala",                  marks: 86, grade: "A" },
  { name: "Rajeswari",               marks: 86, grade: "A" },
  { name: "Shweta",                  marks: 85, grade: "A" },
  { name: "Pallavi Shenoy",          marks: 85, grade: "A" },
  { name: "N Narayanan",             marks: 85, grade: "A" },
  { name: "Akhila Namuduri",         marks: 85, grade: "A" },
  { name: "Sowmyasuresh",            marks: 84, grade: "A" },
  { name: "Girija",                  marks: 84, grade: "A" },
  { name: "Usha S Iyer",            marks: 83, grade: "A" },
  { name: "shashikala kamath",       marks: 83, grade: "A" },
  { name: "Pallavi Garg",            marks: 83, grade: "A" },
  { name: "Muthulaxmi Srinivasan",   marks: 83, grade: "A" },
  { name: "Kgsrinivas",              marks: 83, grade: "A" },
  { name: "J.PATANJALI",             marks: 83, grade: "A" },
  { name: "Ashwini",                 marks: 83, grade: "A" },
  { name: "visalammahalingam",       marks: 82, grade: "A" },
  { name: "Shyam Srinivass",        marks: 82, grade: "A" },
  { name: "Saradha GOPALAN",        marks: 82, grade: "A" },
  { name: "rashmimk",               marks: 82, grade: "A" },
  { name: "Jotsna M Babu",          marks: 82, grade: "A" },
  { name: "Arun",                    marks: 82, grade: "A" },
  { name: "Abhishek Prusty",        marks: 82, grade: "A" },
  { name: "Shrikaanth Krishnamurthy", marks: 81, grade: "A" },
  { name: "Saksham",                marks: 81, grade: "A" },
  { name: "rsnarayani",             marks: 81, grade: "A" },
  { name: "Pavitra Kaveri Hari",    marks: 81, grade: "A" },
  { name: "Meenaakshee Shyam",      marks: 81, grade: "A" },
  { name: "mahendra82",             marks: 81, grade: "A" },
  { name: "Kamakshi Kuppuswamy",    marks: 81, grade: "A" },
  { name: "Dolly Sehgal",           marks: 81, grade: "A" },
  { name: "Suvarna Sudagoni",       marks: 80, grade: "A" },
  { name: "Sahiti Avalur",          marks: 80, grade: "A" },
  { name: "Kannan",                  marks: 80, grade: "A" },
  { name: "Gandharvika J",          marks: 80, grade: "A" },
  { name: "Bharathi.D.K",           marks: 80, grade: "A" },
  { name: "Anuradha Radhakrishnan", marks: 80, grade: "A" },
  // B+ Grade (68-79)
  { name: "Laxminarayan B.", marks: 79, grade: "B+" },
  { name: "Dharmendra Gupta", marks: 79, grade: "B+" },
  { name: "C P P Srinivasa Sastry", marks: 79, grade: "B+" },
  { name: "rama", marks: 78, grade: "B+" },
  { name: "VeeraSubrahmanyaKumar", marks: 78, grade: "B+" },
  { name: "Sivakami B", marks: 78, grade: "B+" },
  { name: "Sreelekha D.R", marks: 78, grade: "B+" },
  { name: "shyamsub", marks: 78, grade: "B+" },
  { name: "Kameswaridevi", marks: 78, grade: "B+" },
  { name: "JAYASHREE RAMACHANDRAN", marks: 78, grade: "B+" },
  { name: "Jayashree M N", marks: 78, grade: "B+" },
  { name: "Jananiramya", marks: 78, grade: "B+" },
  { name: "jagan", marks: 78, grade: "B+" },
  { name: "Geetha Vinod", marks: 78, grade: "B+" },
  { name: "Jayasree Subramanian", marks: 78, grade: "B+" },
  { name: "Prasanna", marks: 77, grade: "B+" },
  { name: "Venu Dasika", marks: 77, grade: "B+" },
  { name: "lakshyaamrita", marks: 77, grade: "B+" },
  { name: "Lalitha chandrasekar", marks: 77, grade: "B+" },
  { name: "kkaveri", marks: 77, grade: "B+" },
  { name: "Girija BR", marks: 77, grade: "B+" },
  { name: "Divya Sureshbabu", marks: 77, grade: "B+" },
  { name: "Anandhy Venkatapathy", marks: 77, grade: "B+" },
  { name: "BASAVARAJU POTLA", marks: 76, grade: "B+" },
  { name: "Vivasvat Joshi", marks: 76, grade: "B+" },
  { name: "Srikrupa Sanjay", marks: 76, grade: "B+" },
  { name: "Sandhya Sridharan", marks: 76, grade: "B+" },
  { name: "P.v.d.lakshmi", marks: 76, grade: "B+" },
  { name: "N.Kannan", marks: 76, grade: "B+" },
  { name: "Deepali Sharma", marks: 76, grade: "B+" },
  { name: "Deepa Mahadevan", marks: 76, grade: "B+" },
  { name: "9535762779", marks: 75, grade: "B+" },
  { name: "शैलजा", marks: 75, grade: "B+" },
  { name: "vignesh prakash", marks: 75, grade: "B+" },
  { name: "Utpal Maity", marks: 75, grade: "B+" },
  { name: "spks.5", marks: 75, grade: "B+" },
  { name: "Rajeswari B", marks: 75, grade: "B+" },
  { name: "Lakshmi NRS", marks: 75, grade: "B+" },
  { name: "Indra Venkataraman", marks: 75, grade: "B+" },
  { name: "JAYASHANKAR V", marks: 75, grade: "B+" },
  { name: "V SAI ANKIT JADAV", marks: 75, grade: "B+" },
  { name: "Amudha Anand", marks: 74, grade: "B+" },
  { name: "Yuktha.J", marks: 74, grade: "B+" },
  { name: "UshaRaniChikkam", marks: 74, grade: "B+" },
  { name: "Subhalakshmi Gangadharan", marks: 74, grade: "B+" },
  { name: "Subhashri Ramabadran", marks: 74, grade: "B+" },
  { name: "Sri Lakshmi", marks: 74, grade: "B+" },
  { name: "Shilashree P", marks: 74, grade: "B+" },
  { name: "Priya Srinivasan", marks: 74, grade: "B+" },
  { name: "Pragya Gupta", marks: 74, grade: "B+" },
  { name: "panchagnula viswanath", marks: 74, grade: "B+" },
  { name: "Padmapriya Ramprasad", marks: 74, grade: "B+" },
  { name: "Monica R", marks: 74, grade: "B+" },
  { name: "Leela N", marks: 74, grade: "B+" },
  { name: "Kalipatnapu Shantharam", marks: 74, grade: "B+" },
  { name: "Vani kadur", marks: 74, grade: "B+" },
  { name: "Thrayi Jayaraman", marks: 73, grade: "B+" },
  { name: "Swathi Sampath", marks: 73, grade: "B+" },
  { name: "V Narayani", marks: 73, grade: "B+" },
  { name: "Sangeetha R", marks: 73, grade: "B+" },
  { name: "Raghunandana", marks: 73, grade: "B+" },
  { name: "paddhu kv", marks: 73, grade: "B+" },
  { name: "Lakshmi.m", marks: 73, grade: "B+" },
  { name: "Janani B", marks: 73, grade: "B+" },
  { name: "GirijaMurali", marks: 73, grade: "B+" },
  { name: "Deepa Rangarajan", marks: 73, grade: "B+" },
  { name: "bhagura", marks: 73, grade: "B+" },
  { name: "Bhavana LV", marks: 73, grade: "B+" },
  { name: "Anagha K Udupa", marks: 73, grade: "B+" },
  { name: "vandana Garg", marks: 72, grade: "B+" },
  { name: "sumangalasrinivas", marks: 72, grade: "B+" },
  { name: "SN", marks: 72, grade: "B+" },
  { name: "Sitaraman.K", marks: 72, grade: "B+" },
  { name: "Seemanthini Gowri M", marks: 72, grade: "B+" },
  { name: "Radhika Lakshminarayanan", marks: 72, grade: "B+" },
  { name: "Radha", marks: 72, grade: "B+" },
  { name: "Rajlakshmi Ganapathy", marks: 72, grade: "B+" },
  { name: "R Baggialakshmi", marks: 72, grade: "B+" },
  { name: "Nidhi R", marks: 72, grade: "B+" },
  { name: "Mridula Arun", marks: 72, grade: "B+" },
  { name: "Lasya Bhat", marks: 72, grade: "B+" },
  { name: "Charishma A", marks: 72, grade: "B+" },
  { name: "Bhagyalakshmi S", marks: 72, grade: "B+" },
  { name: "Varadan", marks: 71, grade: "B+" },
  { name: "Vaishnavi Pillai", marks: 71, grade: "B+" },
  { name: "Sundar Ramachandran", marks: 71, grade: "B+" },
  { name: "Srivatsankara Rao Valluri", marks: 71, grade: "B+" },
  { name: "Sarita Garg", marks: 71, grade: "B+" },
  { name: "Ramani Meiyapphan", marks: 71, grade: "B+" },
  { name: "MANOJ P K", marks: 71, grade: "B+" },
  { name: "Manasvi Sharma", marks: 71, grade: "B+" },
  { name: "Mahesh Murthy", marks: 71, grade: "B+" },
  { name: "Mahalakshmi Sridhar", marks: 71, grade: "B+" },
  { name: "Mahadevan Venkatraman", marks: 71, grade: "B+" },
  { name: "Lalitha Govindaraju", marks: 71, grade: "B+" },
  { name: "Hasini Shyam", marks: 71, grade: "B+" },
  { name: "Gunamay", marks: 71, grade: "B+" },
  { name: "Gopal Padmanabhan", marks: 71, grade: "B+" },
  { name: "G.Usharani", marks: 71, grade: "B+" },
  { name: "Chitra Narayanan", marks: 71, grade: "B+" },
  { name: "Annapurna Reddigari", marks: 71, grade: "B+" },
  { name: "Aditi P", marks: 71, grade: "B+" },
  { name: "Abhilasha gupta", marks: 70, grade: "B+" },
  { name: "Adithya K", marks: 70, grade: "B+" },
  { name: "Chidroopa", marks: 70, grade: "B+" },
  { name: "G. Bhuvaneswari", marks: 70, grade: "B+" },
  { name: "Gaurav Priyadarshan", marks: 70, grade: "B+" },
  { name: "HariniRam", marks: 70, grade: "B+" },
  { name: "Hrushikesh Rajesh", marks: 70, grade: "B+" },
  { name: "Kamakshijayaraman", marks: 70, grade: "B+" },
  { name: "Sangeetha C K", marks: 70, grade: "B+" },
  { name: "Saradamurthy", marks: 70, grade: "B+" },
  { name: "Shishir S Shanbhogue", marks: 70, grade: "B+" },
  { name: "Swarnalatha G", marks: 70, grade: "B+" },
  { name: "Veena Suresh", marks: 70, grade: "B+" },
  { name: "Vijaya S Cheruvu", marks: 70, grade: "B+" },
  { name: "Visishta Advaita.S", marks: 69, grade: "B+" },
  { name: "Y. SREELAKSHMI", marks: 69, grade: "B+" },
  { name: "Sreevidya R", marks: 69, grade: "B+" },
  { name: "Sowmya Krishnapur", marks: 69, grade: "B+" },
  { name: "S.GANESAN", marks: 69, grade: "B+" },
  { name: "RAMYAKANNAN", marks: 69, grade: "B+" },
  { name: "Muthu Kumar Jayaraman", marks: 69, grade: "B+" },
  { name: "M Lalitha", marks: 69, grade: "B+" },
  { name: "advika-v", marks: 69, grade: "B+" },
  { name: "Arunarangarajan", marks: 68, grade: "B+" },
  { name: "Uthra S", marks: 68, grade: "B+" },
  { name: "Vijayalakshmi R", marks: 68, grade: "B+" },
  { name: "Vatsal Dave", marks: 68, grade: "B+" },
  { name: "Swaminathan R", marks: 68, grade: "B+" },
  { name: "Sujatha Bhat", marks: 68, grade: "B+" },
  { name: "Sundhari kailasam", marks: 68, grade: "B+" },
  { name: "Sridevi Ramanathan", marks: 68, grade: "B+" },
  { name: "Shridhar Bhat", marks: 68, grade: "B+" },
  { name: "Ravindra K S", marks: 68, grade: "B+" },
  { name: "Rajiv Khanna", marks: 68, grade: "B+" },
  { name: "Rajyalakshmi Kilambi", marks: 68, grade: "B+" },
  { name: "Poornima Kt", marks: 68, grade: "B+" },
  { name: "Manjushree Patake", marks: 68, grade: "B+" },
  { name: "Krithika", marks: 68, grade: "B+" },
  { name: "Lakshmi Patel", marks: 68, grade: "B+" },
  { name: "Indu kumar", marks: 68, grade: "B+" },
  { name: "JAYASHREE RAMACHANDRAN", marks: 68, grade: "B+" },
  { name: "sindhari", marks: 68, grade: "B+" },
  { name: "Anish Banerjee", marks: 68, grade: "B+" },
  // B Grade (60-67)
  { name: "Aadita Gahalaut", marks: 61, grade: "B" },
  { name: "A R VENKATA SUBRAMANIAN", marks: 61, grade: "B" },
  { name: "Amitabh Joshi", marks: 61, grade: "B" },
  { name: "AparnaKrishnan", marks: 61, grade: "B" },
  { name: "Deesha Thakkar", marks: 61, grade: "B" },
  { name: "Geetha Rajesh", marks: 61, grade: "B" },
  { name: "JANA RAVI KIRAN", marks: 61, grade: "B" },
  { name: "Karuna", marks: 61, grade: "B" },
  { name: "M. Sowjanya", marks: 61, grade: "B" },
  { name: "Mahadevan", marks: 61, grade: "B" },
  { name: "Malathi Ramesh", marks: 61, grade: "B" },
  { name: "Malini Maheshwaran", marks: 61, grade: "B" },
  { name: "Padmashri Mannur", marks: 61, grade: "B" },
  { name: "PanchanadamSwaminathan", marks: 61, grade: "B" },
  { name: "R Kumar", marks: 61, grade: "B" },
  { name: "Radha subramanian", marks: 61, grade: "B" },
  { name: "S.Amruthavalli", marks: 61, grade: "B" },
  { name: "Sandyya U", marks: 61, grade: "B" },
  { name: "Sethumadhavan.V", marks: 61, grade: "B" },
  { name: "Soumya", marks: 61, grade: "B" },
  { name: "Suprasanna S", marks: 61, grade: "B" },
  { name: "Umadevi B P", marks: 61, grade: "B" },
  { name: "vinayakvb", marks: 61, grade: "B" },
  { name: "aarathi", marks: 60, grade: "B" },
  { name: "Aparna Arunkumar", marks: 60, grade: "B" },
  { name: "Bargavi Srinivas", marks: 60, grade: "B" },
  { name: "Chithra Chandrasekaran", marks: 60, grade: "B" },
  { name: "LalithaV", marks: 60, grade: "B" },
  { name: "Nageshwara Sharma K. V", marks: 60, grade: "B" },
  { name: "nalinadevi", marks: 60, grade: "B" },
  { name: "RadhaD", marks: 60, grade: "B" },
  { name: "Rama Devi Damaraju", marks: 60, grade: "B" },
  { name: "S Seetharaman", marks: 60, grade: "B" },
  { name: "Saradha", marks: 60, grade: "B" },
  { name: "Shailaja P S", marks: 60, grade: "B" },
  { name: "Shanthi Ramakrishnan", marks: 60, grade: "B" },
  { name: "SRIPRIYA P", marks: 60, grade: "B" },
  { name: "Uma Viswanathan", marks: 60, grade: "B" },
  { name: "V. Sai Saraswathi", marks: 60, grade: "B" },
  { name: "V.VISWESWARA RAO", marks: 60, grade: "B" },
  { name: "Amlan Sahu", marks: 62, grade: "B" },
  { name: "Anupama", marks: 63, grade: "B" },
  { name: "Dr. Ajay Raval", marks: 62, grade: "B" },
  { name: "Hemalatha Rao", marks: 62, grade: "B" },
  { name: "J Nandan Raju", marks: 62, grade: "B" },
  { name: "Jyoti Singh", marks: 63, grade: "B" },
  { name: "K.V.Lakshmi", marks: 63, grade: "B" },
  { name: "Lakshmi", marks: 63, grade: "B" },
  { name: "Lakshmi ramasubramanian", marks: 63, grade: "B" },
  { name: "MADICHERLA Sri TARUN", marks: 62, grade: "B" },
  { name: "Mahalakshmi Balaji", marks: 63, grade: "B" },
  { name: "Mahathi S", marks: 62, grade: "B" },
  { name: "Nitin Dahra", marks: 63, grade: "B" },
  { name: "paadmajaa", marks: 62, grade: "B" },
  { name: "Padma Sampath", marks: 63, grade: "B" },
  { name: "Padmavathi Ammal", marks: 62, grade: "B" },
  { name: "Parvathi Sivaramam", marks: 62, grade: "B" },
  { name: "Radha10", marks: 62, grade: "B" },
  { name: "Rohan Bharadwaj", marks: 62, grade: "B" },
  { name: "Rukmini Raghunathan", marks: 62, grade: "B" },
  { name: "S padmavathy", marks: 63, grade: "B" },
  { name: "sathya lakshmi", marks: 62, grade: "B" },
  { name: "Srilalitha N S", marks: 62, grade: "B" },
  { name: "V.Anusha", marks: 63, grade: "B" },
  { name: "Vasavi Bharath", marks: 62, grade: "B" },
  { name: "Visalakshi Kannan", marks: 63, grade: "B" },
  { name: "Vishwanathan Iyer", marks: 63, grade: "B" },
  { name: "Anaghaa Shrinivasan", marks: 65, grade: "B" },
  { name: "Anandan Prasanna Kumar", marks: 64, grade: "B" },
  { name: "Anantha Lakshmi G", marks: 66, grade: "B" },
  { name: "Anuradha singi", marks: 65, grade: "B" },
  { name: "AravindTR", marks: 66, grade: "B" },
  { name: "ARJUN VERMA", marks: 67, grade: "B" },
  { name: "Aruna Vasa", marks: 64, grade: "B" },
  { name: "Arunkumari Natarajan", marks: 67, grade: "B" },
  { name: "Ashwini B", marks: 65, grade: "B" },
  { name: "Bhavani Ravichandran", marks: 64, grade: "B" },
  { name: "Brindha G", marks: 67, grade: "B" },
  { name: "Devika Ravi", marks: 66, grade: "B" },
  { name: "Divya", marks: 64, grade: "B" },
  { name: "Dr. Vijaya hethirajan", marks: 66, grade: "B" },
  { name: "Dr.P.NAGARAJU", marks: 67, grade: "B" },
  { name: "GANESAN KRISHNAN", marks: 65, grade: "B" },
  { name: "Gomathi", marks: 64, grade: "B" },
  { name: "HEEMA", marks: 64, grade: "B" },
  { name: "Kala S", marks: 66, grade: "B" },
  { name: "KRISHNA KUMARI M", marks: 66, grade: "B" },
  { name: "lakshmisatish", marks: 67, grade: "B" },
  { name: "lshubhada", marks: 64, grade: "B" },
  { name: "malolan", marks: 64, grade: "B" },
  { name: "Mythili Ramaswamy", marks: 66, grade: "B" },
  { name: "Narasimha Datta", marks: 65, grade: "B" },
  { name: "Padmini Majumdar", marks: 65, grade: "B" },
  { name: "Pavithra Ramaswamy", marks: 67, grade: "B" },
  { name: "Pola Subbarao", marks: 64, grade: "B" },
  { name: "Poornima Ramesh Kumar", marks: 65, grade: "B" },
  { name: "Raj", marks: 66, grade: "B" },
  { name: "Rama Ramachandran", marks: 65, grade: "B" },
  { name: "ramakrishna vuppuluri", marks: 64, grade: "B" },
  { name: "Samanvitha Ananthakrishna", marks: 67, grade: "B" },
  { name: "Sharmishta", marks: 64, grade: "B" },
  { name: "Shashank Ramakrishnan", marks: 65, grade: "B" },
  { name: "Shyamala Rajeev", marks: 65, grade: "B" },
  { name: "Sireesha Saraswatula", marks: 67, grade: "B" },
  { name: "SOWMYA NARASIMHAN", marks: 64, grade: "B" },
  { name: "Srimathi Raghavendran", marks: 66, grade: "B" },
  { name: "Subramaniam Kumar R", marks: 65, grade: "B" },
  { name: "sundarusha", marks: 65, grade: "B" },
  { name: "suseela Subbulakshmi", marks: 65, grade: "B" },
  { name: "swaminathan.b", marks: 67, grade: "B" },
  { name: "Tretha Rajgopal", marks: 66, grade: "B" },
  { name: "Uma Venkataraman", marks: 65, grade: "B" },
  { name: "Usha Tuppal", marks: 65, grade: "B" },
  { name: "Usharani Sridharan", marks: 65, grade: "B" },
  { name: "V. KAMAKSHI", marks: 65, grade: "B" },
  { name: "Vamsi Sudha", marks: 67, grade: "B" },
  { name: "Venkata Kompella", marks: 67, grade: "B" },
  { name: "Vijayagopala Viswanathan", marks: 64, grade: "B" },
  { name: "Vikash Khanna", marks: 66, grade: "B" },
  { name: "Visalakshy Ramani", marks: 64, grade: "B" },
  { name: "Vishalakshi S", marks: 65, grade: "B" }
];

  const past = [
    {
      year: 2025,
      name: "Rāmāyaṇa Navaha Yajña — Online Quiz 2025",
      participants: PARTICIPANTS_2025.length,
      format: "Online",
      levels: ["Open to All"],
      toppers: PARTICIPANTS_2025.slice(0, 3).map((p, i) => ({
        rank: i + 1, name: p.name, score: `${p.marks}/100`, grade: p.grade, prize: p.grade,
      })),
      allParticipants: PARTICIPANTS_2025,
    }
  ];
  const rankE = ["1.", "2.", "3."];

  // ── Modal shell wrapper ───────────────────────────────────────────────────
  const ModalShell = ({ title, children }) => (
    <div style={{
      background: C.white, borderRadius: 16,
      width: "min(95vw, 860px)",
      overflowY: "auto",
      padding: "clamp(20px,3vw,36px)",
      boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", color: C.brown1,
          fontSize: "clamp(16px,2.5vw,20px)", flex: 1, paddingRight: 16 }}>{title}</h2>
        <button onClick={() => setModalOpen(null)} style={{
          background: "none", border: "none", fontSize: 28,
          cursor: "pointer", color: C.textMuted, lineHeight: 1, flexShrink: 0,
        }}>×</button>
      </div>
      {children}
    </div>
  );

  // ── Parayana Modal ────────────────────────────────────────────────────────
  const ParayanaModal = () => (
    <ModalShell title="Rāmāyaṇa Navaha Yajña — Certificate & Quiz">
      <div style={{ background: C.orange5, padding: 16, borderRadius: 12, margin: "0 0 20px",
        fontFamily: "'Noto Serif Devanagari', serif", fontSize: 15, color: C.brown1, textAlign: "center" }}>
        नवाह्ना किल श्रोतव्यं रामायणकथामृतम् ।<br/>
        ते कृतज्ञा महात्मानः तेभ्यो नित्यं नमो नमः ॥<br/>
        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13,
          color: C.textMid, display: "block", marginTop: 8, lineHeight: 1.7 }}>
          For nine days, one must listen to the divine nectar of the Ramayana.<br/>
          Those who do are blessed and noble souls — salutations to them, always!<br/>
          <em>— Skanda-purāṇam, Uttara-khaṇḍaḥ, Nārada-sanatkumāra-saṃvādaḥ,
          Rāmāyaṇa-māhātmyam, 5th Chapter, 50th &amp; 51st verses</em>
        </span>
      </div>
      <Divider accent />
      <h3 style={{ fontFamily: "'Poppins', sans-serif", color: C.brown1,
        fontSize: 15, margin: "16px 0 8px" }}>
        What will you gain? (Key Benefits / Learning Outcomes)
      </h3>
      <ul style={{ fontFamily: "'Poppins',sans-serif", color: C.textMid,
        fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
        <li>Listening to 50+ hours of Divine verses composed by Maharshi Valmiki</li>
        <li>Listening to 25+ hours of Pravacana in Simple Sanskrit</li>
        <li>Enhance your Sanskrit reading and comprehension skills</li>
      </ul>
      <h3 style={{ fontFamily: "'Poppins', sans-serif", color: C.brown1,
        fontSize: 15, margin: "16px 0 8px" }}>
        What are the materials / support you get?
      </h3>
      <ul style={{ fontFamily: "'Poppins',sans-serif", color: C.textMid,
        fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
        <li>Full playlist of all Pārāyaṇa &amp; Pravacana session recordings.</li>
        <li>Access to video recordings of every Parayana &amp; Pravacana for repeated listening.</li>
        <li>
          Please note: The presentation (neither PPT nor PDF) will NOT be shared with participants.
          {" "}For self-parayana, use this PDF —{" "}
          <a href="https://archive.org/details/361952998SrimadValmikiRamayanaSanskrit1933AD/"
            target="_blank" rel="noreferrer" style={{ color: C.green1 }}>
            Download Vālmīki Rāmāyaṇa PDF
          </a>
        </li>
      </ul>
      <h3 style={{ fontFamily: "'Poppins', sans-serif", color: C.brown1,
        fontSize: 15, margin: "16px 0 8px" }}>
        Pre-requisites (Eligibility)
      </h3>
      <ul style={{ fontFamily: "'Poppins',sans-serif", color: C.textMid,
        fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
        <li>Ability to read Devanagari script</li>
        <li>Ability to understand simple Sanskrit</li>
        <li>Participation with Shraddhaa (Faith) and Bhakti (Devotion) in Śrī Rāma</li>
      </ul>
      <p style={{ fontFamily: "'Poppins',sans-serif", color: C.textMid,
        fontSize: 13, marginTop: 16, lineHeight: 1.7 }}>
        Watch the full recording playlist of all Pārāyaṇa &amp; Pravacana sessions:<br/>
        <a href={YOUTUBE_URL} target="_blank" rel="noreferrer"
          style={{ color: C.green1 }}>{YOUTUBE_URL}</a>
      </p>
      <Divider accent />
      <h3 style={{ fontFamily: "'Poppins', sans-serif", color: C.brown1,
        fontSize: 15, margin: "16px 0 8px" }}>
        🏆 Online Quiz 2026 — Details
      </h3>
      <div style={{ background: C.orange5, border: `1px solid ${C.orange4}`,
        borderRadius: 10, padding: "14px 16px", marginBottom: 16,
        fontFamily: "'Poppins',sans-serif", fontSize: 13, color: C.textMid, lineHeight: 1.8 }}>
        <div style={{ marginBottom: 6 }}>
          <strong style={{ color: C.brown1 }}>Organised by:</strong>{" "}
          Vyoma Linguistic Labs Foundation —{" "}
          <a href="https://www.sanskritfromhome.org" target="_blank" rel="noreferrer"
            style={{ color: C.green1 }}>sanskritfromhome.org</a>
        </div>
        <div style={{ marginBottom: 6 }}>
          <strong style={{ color: C.brown1 }}>Event:</strong>{" "}
          Śrīmad Vālmīki Rāmāyaṇa Navāha Pārāyaṇa &amp; Pravacana Yajña 2026
        </div>
        <div style={{ marginBottom: 6 }}>
          <strong style={{ color: C.brown1 }}>Quiz window:</strong>{" "}
          30 March 2026, 6:30 PM (IST) — 6 April 2026, 10:00 AM (IST)
        </div>
        <div style={{ marginBottom: 6 }}>
          <strong style={{ color: C.brown1 }}>Topic:</strong>{" "}
          Valmiki Rāmāyaṇa knowledge — win exciting cash prizes!
        </div>
      </div>
      <Divider />
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end",
        marginTop: 20, flexWrap: "wrap" }}>
        <Btn variant="secondary" onClick={() => setModalOpen(null)}>Close</Btn>
      </div>
    </ModalShell>
  );

  // ── Result Modal ──────────────────────────────────────────────────────────
  const ResultModal = () => {
    const [gradeFilter, setGradeFilter] = useState("A+");
    const grades = ["A+", "A", "B+", "B"];
    return (
      <ModalShell title="Quiz Results — 2025 Participants">
        {past.map((y, yi) => (
          <div key={yi} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", color: C.brown1, fontSize: 17 }}>{y.name}</h3>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Tag>{y.participants.toLocaleString()} Participants</Tag>
                <Tag>{y.format}</Tag>
              </div>
            </div>

            {/* 2025 — full leaderboard with grade filter */}
            {y.allParticipants ? (
              <>
                {/* Top 3 podium */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
                  {y.toppers.map((t, ti) => (
                    <div key={ti} style={{ background: ti===0 ? C.orange5 : C.cardBg,
                      border: `2px solid ${C.orange1}`, borderRadius: 10, padding: "12px 10px",
                      textAlign: "center" }}>
                      <div style={{ fontFamily: "'Poppins',sans-serif", color: C.orange1,
                        fontSize: 22, fontWeight: 800 }}>{ti===0?"🥇":ti===1?"🥈":"🥉"}</div>
                      <div style={{ fontFamily: "'Poppins',sans-serif", color: C.brown1,
                        fontSize: 12, fontWeight: 700, marginTop: 4 }}>{t.name}</div>
                      <div style={{ fontFamily: "'Poppins',sans-serif", color: C.orange1,
                        fontSize: 13, fontWeight: 700, marginTop: 2 }}>{t.score}</div>
                      <div style={{ background: C.green1, color: "#fff", borderRadius: 12,
                        padding: "2px 10px", fontSize: 10, fontFamily: "'Poppins',sans-serif",
                        fontWeight: 700, display: "inline-block", marginTop: 4 }}>{t.grade}</div>
                    </div>
                  ))}
                </div>

                {/* Grade filter pills */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontFamily: "'Poppins',sans-serif", color: C.brown3,
                    fontSize: 11, marginBottom: 6, letterSpacing: 0.5 }}>FILTER BY GRADE</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {grades.map(g => {
                      const count = y.allParticipants.filter(p => p.grade === g).length;
                      if (count === 0) return null;
                      return (
                        <button key={g} onClick={() => setGradeFilter(g)} className="bt" style={{
                          background: gradeFilter === g ? C.green1 : C.cardBg,
                          color: gradeFilter === g ? C.white : C.brown2,
                          border: `1.5px solid ${gradeFilter === g ? C.green1 : C.orange4}`,
                          borderRadius: 20, padding: "4px 14px",
                          fontFamily: "'Poppins',sans-serif", fontSize: 12,
                          fontWeight: gradeFilter === g ? 700 : 400, cursor: "pointer",
                        }}>{g} <span style={{ opacity: 0.7, fontSize: 10 }}>({count})</span></button>
                      );
                    })}
                  </div>
                </div>

                {/* Participant table */}
                <div style={{ border: `1px solid ${C.orange4}`, borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "2rem 1fr 4rem 3rem",
                    background: C.orange1, padding: "8px 14px", gap: 8 }}>
                    {["#","Name","Marks","Grade"].map(h => (
                      <div key={h} style={{ fontFamily: "'Poppins',sans-serif", color: "#fff",
                        fontSize: 11, fontWeight: 700 }}>{h}</div>
                    ))}
                  </div>
                  {y.allParticipants
                    .filter(p => p.grade === gradeFilter)
                    .map((p, pi, arr) => (
                      <div key={pi} style={{
                        display: "grid", gridTemplateColumns: "2rem 1fr 4rem 3rem",
                        padding: "7px 14px", gap: 8,
                        background: pi % 2 === 0 ? C.cardBg : C.orange5,
                        borderBottom: pi < arr.length-1 ? `1px solid ${C.orange4}` : "none",
                        alignItems: "center",
                      }}>
                        <div style={{ fontFamily: "'Poppins',sans-serif", color: C.brown3,
                          fontSize: 11 }}>{pi+1}</div>
                        <div style={{ fontFamily: "'Poppins',sans-serif",
                          color: C.brown1, fontSize: 13 }}>{p.name}</div>
                        <div style={{ fontFamily: "'Poppins',sans-serif", color: C.orange1,
                          fontSize: 13, fontWeight: 700 }}>{p.marks}/100</div>
                        <div style={{ background: C.green1, color: "#fff", borderRadius: 12,
                          padding: "2px 8px", fontSize: 10, fontFamily: "'Poppins',sans-serif",
                          fontWeight: 700, textAlign: "center" }}>{p.grade}</div>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              /* 2024 and earlier — simple toppers list */
              <>
                {y.toppers.map((t, ti) => (
                  <Card key={ti} style={{ display: "flex", justifyContent: "space-between",
                    alignItems: "center", flexWrap: "wrap", gap: 8,
                    borderLeft: `4px solid ${C.orange1}`, marginBottom: 8 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ fontFamily: "'Poppins',sans-serif", color: C.orange1,
                        fontSize: 22, fontWeight: 700 }}>{rankE[ti]}</span>
                      <div>
                        <div style={{ fontFamily: "'Poppins',sans-serif", color: C.textDark, fontSize: 14 }}>{t.name}</div>
                        <div style={{ fontFamily: "'Poppins',sans-serif",
                          color: C.textLight, fontSize: 12, fontStyle: "italic" }}>
                          {t.city} · Score: {t.score}
                        </div>
                      </div>
                    </div>
                    <div style={{ background: C.orange5, color: C.orange1,
                      border: `1px solid ${C.orange4}`, borderRadius: 6,
                      padding: "6px 13px", fontFamily: "'Poppins',sans-serif",
                      fontSize: 11, fontWeight: 700 }}>{t.prize}</div>
                  </Card>
                ))}
              </>
            )}
            {yi < past.length - 1 && <Divider />}
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <Btn variant="secondary" onClick={() => setModalOpen(null)}>Close</Btn>
        </div>
      </ModalShell>
    );
  };

  // ── Single return — portal lives inside here ──────────────────────────────
  return (
    <div className="pi">
      <PageHdr title="Quiz & Certifications"
        subtitle="Ramayana Online Quiz & Certificates"
        accentColor={C.orange1} />

      {/* Info cards */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 56px" }}>
        <div style={{ display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>

          {/* Card 0: Quiz 2026 */}
          <Card style={{ borderTop: `3px solid #b5451b`, background: "linear-gradient(160deg,#fff8f5 0%,#fff 80%)" }}>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", color: C.brown1,
              fontSize: 14, marginBottom: 6 }}>
              Rāmāyaṇa Online Quiz 2026
            </h3>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: C.textMid,
              fontSize: 12, lineHeight: 1.6, marginBottom: 4 }}>
              <strong style={{ color: C.brown1 }}>Organised by:</strong> Vyoma Linguistic Labs Foundation
              (sanskritfromhome.org)
            </p>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: C.textMid,
              fontSize: 12, lineHeight: 1.6, marginBottom: 12 }}>
              Test your knowledge of the Valmiki Rāmāyaṇa and win exciting cash prizes!
              Please read all instructions carefully before attempting.
            </p>
          </Card>

          {/* Card 1: Certificate & Quiz — unified */}
          <Card style={{ borderTop: `3px solid ${C.orange1}` }}>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", color: C.brown1,
              fontSize: 14, marginBottom: 8 }}>
              Rāmāyaṇa Navaha Yajña — Certificate &amp; Online Quiz
            </h3>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: C.textMid,
              fontSize: 12, lineHeight: 1.6, marginBottom: 12 }}>
              Attend all 9 days to earn the Navaha Yajña Certificate and participate in the
              live Online Quiz during Pravacana sessions to win prizes — one registration for both.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Btn variant="secondary" onClick={() => setModalOpen('parayana')}>View Details</Btn>
            </div>
          </Card>

          {/* Card 2: Coming soon */}
          <Card style={{ borderTop: `3px solid ${C.orange1}`, opacity: 0.75 }}>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", color: C.brown1,
              fontSize: 14, marginBottom: 8 }}>Parayana Professional Certificate</h3>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: C.textMid,
              fontSize: 12, lineHeight: 1.5, marginBottom: 12 }}>
              Advanced certification coming soon.
            </p>
            <span style={{ background: C.orange5, color: C.orange1,
              border: `1px solid ${C.orange4}`, borderRadius: 20,
              padding: "4px 12px", fontSize: 10,
              fontFamily: "'Poppins', sans-serif" }}>Coming soon</span>
          </Card>

          {/* Card 3: Past results */}
          <Card style={{ borderTop: `3px solid ${C.orange1}` }}>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", color: C.brown1,
              fontSize: 14, marginBottom: 8 }}>Last Year Quiz Result</h3>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: C.textMid,
              fontSize: 12, lineHeight: 1.5, marginBottom: 12 }}>
              See 2025 participant results with grade-wise leaderboard — A+, A, B+, B grades.
            </p>
            <Btn onClick={() => setModalOpen('result')}>View 2025 Results</Btn>
          </Card>
        </div>
      </div>

      {/* Modal — Portal renders on document.body, above navbar & footer */}
      {modalOpen && createPortal(
        <div onClick={() => setModalOpen(null)} style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          zIndex: 9999,
          paddingTop: "clamp(72px,9vw,96px)",
          paddingBottom: 40, paddingLeft: 16, paddingRight: 16,
          overflowY: "auto",
        }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%" }}>
            {modalOpen === 'parayana' && <ParayanaModal />}
            {modalOpen === 'result'   && <ResultModal />}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}