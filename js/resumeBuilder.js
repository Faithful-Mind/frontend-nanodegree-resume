var bio = {
  "name": "YUAN Ye",
  "role": "Web Developer",
  "welcomeMessage": "Hello World!",
  "biopic": "",
  "contacts": {
    "mobile": 15680775070,
    "email": "lpyy15@gmail.com",
    "github": "Faithful-Mind",
    "location": "Chengdu"
  },
  "skills": ["Java", "Python", "C lang", "Office skills"],
};
var work = {
  "jobs": [
    {
      "employer": "Chongqing Cable Network",
      "title": "Tech Engineer",
      "location": "Liangping County",
      "dates": "2016-07 to 2016-08",
      "description": "Tech support"
    },
  ],
};
var projects = {
  "projects": [
    {
      "title": "portfolio",
      "dates": "2016-12-01 to 2016-12-15",
      "description": "implementations of HTML and CSS",
      "images": ""
    },
  ],
};
var education = {
  "schools": [
    {
      "name": "Taiyuan University of Technology",
      "location": "Taiyuan",
      "degree": "Bachelor",
      "majors": ["Opt-electric Information Science and Engineering"],
      "dates": 2017,
      // "url": ""
    },
  ],
  "onlineCourses": [
    {
      "title": "cs01",
      "school": "Taiyuan University of Technology",
      "dates": 2016,
      "url": ""
    },
  ],
};

/**
 * Shorthand for document.querySelector
 */
var select = document.querySelector.bind(document);

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

var presenter = {
  init() {
    this.renderBio();
    this.renderWork();
    this.renderProjects();
    this.renderEducation();
    this.renderOnlineCourses();
    $("#mapDiv").append(googleMap);

  },
  renderBio() {
    select("#header").insertBefore(htmlToElement(HTMLheaderName.replace("%data%", bio.name)), select('#topContacts'));
    select("#header").insertBefore(htmlToElement(HTMLheaderRole.replace("%data%", bio.role)), select('#topContacts'));
    var contactsLis = Object.keys(bio.contacts).reduce((ct1, ct2) => 
      ct1 + HTMLcontactGeneric.replace("%contact%", ct2).replace("%data%", bio.contacts[ct2])
    , '');
    select("#topContacts").insertAdjacentHTML('beforeend', contactsLis);

    if (bio.skills.length > 0) {
      select("#header").insertAdjacentHTML('beforeend', HTMLskillsStart);
      for (skill of bio.skills) {
        select("#skills").insertAdjacentHTML('beforeend', HTMLskills.replace("%data%", skill));
      }
    }
  },

  renderWork() {
    select("#workExperience").insertAdjacentHTML('beforeend', HTMLworkStart);
    select(".work-entry:last-child").insertAdjacentHTML('beforeend',
      work.jobs.map(job => this._dataToHtml(job, 'work'))
    );
  },

    // $(document).click(function(loc) {
    //   logClicks(loc.pageX, loc.pageY);
    // });

    // $("#main").append(internationalizeButton);

  renderProjects() {
    select("#projects").insertAdjacentHTML('beforeend', HTMLprojectStart);
    select(".project-entry:last-child").insertAdjacentHTML('beforeend',
      HTMLprojectTitle.replace("%data%", projects.projects.map(project =>
        this._dataToHtml(project, 'project')
      ))
    );
  },

  renderEducation() {
    select('#education').insertAdjacentHTML('beforeend', HTMLschoolStart);
    select('.education-entry').insertAdjacentHTML('beforeend', education.schools.map(school => 
      this._dataToHtml(school, 'school')
    ).join(''));
  },

  renderOnlineCourses() {
    select('.education-entry').insertAdjacentHTML('beforeend', HTMLonlineClasses + education.onlineCourses.map(mooc => 
      this._dataToHtml(mooc, 'online')
    ).join(''));
  },

  _HtmlStrs: {
    HTMLworkEmployer,
    HTMLworkTitle,
    HTMLworkDates,
    HTMLworkLocation, 
    HTMLworkDescription,

    HTMLprojectTitle,
    HTMLprojectDates,
    HTMLprojectDescription,
    HTMLprojectImage,

    HTMLschoolName,
    HTMLschoolDegree,
    HTMLschoolDates,
    HTMLschoolLocation,
    HTMLschoolMajor,

    HTMLonlineTitle,
    HTMLonlineSchool,
    HTMLonlineDates,
    HTMLonlineURL,
  },

  _dataToHtml(data, section) {
    return Object.keys(data).reduce((s1, s2) => {
      // workarounds for inconsistent naming conventions
      if (section === 'project' && s2 === 'images') {
        return s1 + HTMLprojectImage.replace('%data%', data[s2]);
      }
      if (section === 'school' && s2 === 'majors') {
        return s1 + data[s2].reduce((m1, m2) => HTMLschoolMajor.replace('%data%', data[m2]));
      }
      if (section === 'school' && s2 === 'dates') {
        // add `<br />` between dates and major
        return s1 + HTMLschoolDates.replace('%data%', data[s2]) + '<br />';
      }
      if (section === 'online' && s2 === 'url') {
        return s1 + HTMLonlineURL.replace('%data%', data[s2]);
      }

      return s1 + this._HtmlStrs['HTML' + section + s2[0].toUpperCase() + s2.substring(1)].replace('%data%', data[s2]);
    }, '');
  },
}

presenter.init();
