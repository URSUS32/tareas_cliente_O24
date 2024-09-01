interface CVData {
    name: string;
    profession: string;
    email: string;
    getform_url: string; 
    'form-email': string;
    'contact-links': {
        github: string;
        linkedin: string;
    };
    skills: string[];
    technologies: string[];
    hobbies: string[];
    experience: {
        role: string;
        company: string;
        years: string;
        description: string;
    }[];
    education: {
        institution: string;
        years: string;
        degree: string;
    }[];
    projects: {
        title: string;
        years: string;
        description: string;
    }[];
}

function createSection(
    listElementId: string, 
    items: { title?: string; institution?: string; role?: string; years: string; description: string; }[], 
    titleKey: keyof typeof items[0]
) {
    const listElement = document.getElementById(listElementId)!;
    items.forEach(item => {
        const li = document.createElement('li');

        if (item[titleKey]) {
            const titleElement = document.createElement('h3');
            titleElement.textContent = item[titleKey];
            li.appendChild(titleElement);
        }

        const yearsElement = document.createElement('p');
        yearsElement.className = 'dates';
        yearsElement.textContent = item.years;
        li.appendChild(yearsElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'data-summary';
        descriptionElement.textContent = item.description;
        li.appendChild(descriptionElement);

        listElement.appendChild(li);
    });
}

async function loadCVData() {
    try {
        const response = await fetch('../json/cv_data.json');
        const data: CVData = await response.json();

        // GENERAL DATA
        document.getElementById('name')!.textContent = data.name;
        document.getElementById('profession')!.textContent = data.profession;
        document.getElementById('email')!.setAttribute('href', `mailto:${data.email}`);
        document.getElementById('email')!.textContent = data.email;

        // CONTACT
        document.getElementById('github-link')!.setAttribute('href', data['contact-links'].github);
        document.getElementById('linkedin-link')!.setAttribute('href', data['contact-links'].linkedin);

        // SKILLS
        const skillsList = document.getElementById('skills-list')!;
        data.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        // TECHNOLOGIES
        const technologiesList = document.getElementById('technologies-list')!;
        data.technologies.forEach(technology => {
            const li = document.createElement('li');
            li.textContent = technology;
            technologiesList.appendChild(li);
        });

        // HOBBIES
        const hobbiesList = document.getElementById('hobbies-list')!;
        data.hobbies.forEach(hobby => {
            const li = document.createElement('li');
            li.textContent = hobby;
            hobbiesList.appendChild(li);
        });

        // EXPERIENCE
        createSection('experience-list', data.experience, 'role');

        // EDUCATION
        createSection('education-list', data.education.map(edu => ({
            title: edu.institution,
            years: edu.years,
            description: edu.degree
        })), 'title');

        // PROJECTS
        createSection('projects-list', data.projects, 'title');

        //CONTACT-FORM
        const formElement = document.querySelector('.contact-form form') as HTMLFormElement;
        if (formElement) {
            formElement.setAttribute('action', data.getform_url);
        }


    } catch (error) {
        console.error('Error al cargar el CV:', error);
    }
}

window.onload = loadCVData;
