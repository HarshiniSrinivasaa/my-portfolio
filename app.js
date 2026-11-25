var app = angular.module("portfolioApp", []);

app.controller("PortfolioController", function ($scope, $window, $http) {

    $scope.navigation = [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Education", id: "education" },
        { name: "Skills", id: "skills" },
        { name: "Certificates", id: "certificates" },
        { name: "Contact", id: "contact" }
    ];

    $scope.menuOpen = false;
    $scope.activeSection = "home";
    $scope.currentYear = new Date().getFullYear();

    $scope.education = [
        {
            title: "Schooling",
            institution: "Vijayavittala Vidya Shala",
            year: "2023",
            level: "School Education",
            icon: "✦"
        },
        {
            title: "Pre-University",
            institution: "Pramati Hill View",
            year: "2025",
            level: "Pre-University Education",
            icon: "✧"
        },
        {
            title: "Undergraduate",
            institution: "BCA Data Science, Amrita Vishwa Vidyapeetham, Mysuru Campus",
            year: "2025 - Present",
            level: "Bachelor's Degree",
            icon: "◆"
        }
    ];

    $scope.technicalSkills = [
        { name: "C Programming", icon: "C", description: "Programming Fundamentals" },
        { name: "Python", icon: "Py", description: "Programming Language" },
        { name: "HTML", icon: "5", description: "Web Structure" },
        { name: "C++", icon: "C++", description: "Object-Oriented Programming" },
        { name: "Java", icon: "J", description: "Object-Oriented Programming" },
        { name: "UI/UX", icon: "UI", description: "User Interface and Experience" },
        { name: "Data Structures", icon: "DS", description: "Problem-Solving Concepts" },
        { name: "Biological Concepts", icon: "BIO", description: "Basic Biology and Scientific Knowledge" }
    ];

    $scope.personalSkills = [
        { name: "Problem-Solving", icon: "◎" },
        { name: "Critical Thinking", icon: "◇" },
        { name: "Analytical Thinking", icon: "⌕" },
        { name: "Teamwork", icon: "♧" },
        { name: "Time Management", icon: "◷" },
        { name: "Adaptability", icon: "↗" },
        { name: "Self-Learning", icon: "✧" },
        { name: "Attention to Detail", icon: "⊙" }
    ];

    $scope.certificates = [
        { name: "Python Essentials 1", provider: "Cisco" },
        { name: "Python Essentials 2", provider: "Cisco" },
        { name: "C Programming", provider: "IT Desk" },
        { name: "C++ Programming", provider: "IT Desk" },
        { name: "Java", provider: "Scalar" },
        { name: "JavaScript Essentials", provider: "Cisco" }
    ];

    $scope.hoveredCard = null;

    $scope.setHover = function (name) {
        $scope.hoveredCard = name;
    };

    $scope.clearHover = function () {
        $scope.hoveredCard = null;
    };

    $scope.contact = {};
    $scope.sending = false;
    $scope.successMessage = "";
    $scope.errorMessage = "";

    $scope.sendMessage = function (form) {
        $scope.successMessage = "";
        $scope.errorMessage = "";

        if (form.$invalid) {
            $scope.errorMessage = "Please complete all fields correctly.";
            return;
        }

        $scope.sending = true;

        $http.post("contact.php", $scope.contact)
            .then(function (response) {
                if (response.data.success) {
                    $scope.successMessage = response.data.message;
                    $scope.contact = {};
                    form.$setPristine();
                    form.$setUntouched();
                } else {
                    $scope.errorMessage = response.data.message ||
                        "Unable to send your message.";
                }
            })
            .catch(function () {
                $scope.errorMessage =
                    "Unable to connect to the server. Please try again later.";
            })
            .finally(function () {
                $scope.sending = false;
            });
    };

    function updateActiveSection() {
        var sections = [
            "home",
            "about",
            "education",
            "skills",
            "certificates",
            "contact"
        ];

        var current = "home";

        sections.forEach(function (id) {
            var element = document.getElementById(id);

            if (element &&
                element.getBoundingClientRect().top <= 150) {
                current = id;
            }
        });

        if ($scope.activeSection !== current) {
            $scope.$applyAsync(function () {
                $scope.activeSection = current;
            });
        }
    }

    $window.addEventListener("scroll", updateActiveSection);

    $scope.$on("$destroy", function () {
        $window.removeEventListener("scroll", updateActiveSection);
    });

});