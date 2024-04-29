function skillsMember() {
    var member = {
        name: 'John Doe',
        age: 30,
        skills: ['HTML', 'CSS', 'JS'],
        // Path: member.js
        displaySkills: function() {
        this.skills.forEach(function(skill) {
            console.log(`${this.name} knows ${skill}`);
        });
        }
    };
    member.displaySkills();
    }