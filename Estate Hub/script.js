/* =========================================================
   ESTATEHUB
   POLISHED MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   PROPERTY DATA
========================================================= */

let properties = [

    {
        id: 1,
        title: "Modern Skyline Apartment",
        type: "Apartment",
        mode: "Buy",
        location: "Hyderabad",
        price: 8500000,
        bedrooms: 3,
        bathrooms: 2,
        area: 1650,
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
        description:
            "A modern apartment with spacious interiors, excellent connectivity and premium lifestyle amenities."
    },

    {
        id: 2,
        title: "Elegant Family House",
        type: "House",
        mode: "Buy",
        location: "Bengaluru",
        price: 12500000,
        bedrooms: 4,
        bathrooms: 3,
        area: 2400,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        description:
            "A comfortable family home located in a peaceful residential neighbourhood."
    },

    {
        id: 3,
        title: "Luxury Garden Villa",
        type: "Villa",
        mode: "Buy",
        location: "Mumbai",
        price: 22000000,
        bedrooms: 4,
        bathrooms: 4,
        area: 3200,
        image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
        description:
            "A luxurious villa offering privacy, elegant interiors and a beautiful outdoor space."
    },

    {
        id: 4,
        title: "Premium Residential Plot",
        type: "Plot",
        mode: "Buy",
        location: "Hyderabad",
        price: 4500000,
        bedrooms: 0,
        bathrooms: 0,
        area: 1800,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
        description:
            "A well-positioned residential plot suitable for building a future home."
    },

    {
        id: 5,
        title: "City View Rental Apartment",
        type: "Apartment",
        mode: "Rent",
        location: "Chennai",
        price: 35000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1250,
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
        description:
            "A comfortable rental apartment with modern facilities and easy access to major areas."
    },

    {
        id: 6,
        title: "Contemporary Villa",
        type: "Villa",
        mode: "Rent",
        location: "Bengaluru",
        price: 75000,
        bedrooms: 4,
        bathrooms: 4,
        area: 2900,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
        description:
            "A stylish villa with spacious rooms and premium residential surroundings."
    },

    {
        id: 7,
        title: "Commercial Office Space",
        type: "Commercial",
        mode: "Buy",
        location: "Hyderabad",
        price: 18000000,
        bedrooms: 0,
        bathrooms: 2,
        area: 3000,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
        description:
            "A commercial office property suitable for businesses looking for a professional workspace."
    },

    {
        id: 8,
        title: "Affordable Family Home",
        type: "House",
        mode: "Buy",
        location: "Chennai",
        price: 7200000,
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
        description:
            "An affordable and comfortable house suitable for families."
    },

    {
        id: 9,
        title: "Business Retail Space",
        type: "Commercial",
        mode: "Rent",
        location: "Mumbai",
        price: 95000,
        bedrooms: 0,
        bathrooms: 1,
        area: 2200,
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
        description:
            "A versatile commercial space suitable for retail and business operations."
    }

];


/* =========================================================
   STATE
========================================================= */

let currentListing = "All";

let favorites =
    JSON.parse(localStorage.getItem("estatehubFavorites")) || [];

let userListings =
    JSON.parse(localStorage.getItem("estatehubListings")) || [];

let compareList =
    JSON.parse(localStorage.getItem("estatehubCompare")) || [];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const propertyGrid =
    document.getElementById("propertyGrid");

const featuredProperties =
    document.getElementById("featuredProperties");

const favoriteGrid =
    document.getElementById("favoriteGrid");

const toast =
    document.getElementById("toast");

const navMenu =
    document.getElementById("navMenu");

const menuToggle =
    document.getElementById("menuToggle");

const listingModal =
    document.getElementById("listingModal");

const loginModal =
    document.getElementById("loginModal");

const emiModal =
    document.getElementById("emiModal");

const compareModal =
    document.getElementById("compareModal");

const propertyModal =
    document.getElementById("propertyModal");


/* =========================================================
   COMBINE PROPERTY DATA
========================================================= */

function getAllProperties() {

    return [
        ...properties,
        ...userListings
    ];

}


/* =========================================================
   FIND PROPERTY
========================================================= */

function getPropertyById(id) {

    return getAllProperties().find(
        property => Number(property.id) === Number(id)
    );

}


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(price, mode = "Buy") {

    price = Number(price) || 0;

    if (mode === "Rent") {

        return "₹" +
            price.toLocaleString("en-IN") +
            " / month";

    }

    if (price >= 10000000) {

        return "₹" +
            (price / 10000000).toFixed(2) +
            " Cr";

    }

    if (price >= 100000) {

        return "₹" +
            (price / 100000).toFixed(2) +
            " L";

    }

    return "₹" +
        price.toLocaleString("en-IN");

}


/* =========================================================
   PROPERTY CARD
========================================================= */

function createPropertyCard(property) {

    const isFavorite =
        favorites.includes(property.id);

    const isCompared =
        compareList.includes(property.id);

    return `

        <article class="property-card">

            <div class="property-image">

                <img
                    src="${property.image}"
                    alt="${property.title}"
                    loading="lazy"
                    onerror="this.src='https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80'"
                >

                <span class="property-badge">
                    ${property.mode}
                </span>

                <button
                    class="favorite-btn ${isFavorite ? "active" : ""}"
                    onclick="toggleFavorite(${property.id})"
                    aria-label="Add to favorites"
                    title="${isFavorite ? "Remove from favorites" : "Add to favorites"}"
                >

                    <i class="${
                        isFavorite
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                    }"></i>

                </button>

            </div>


            <div class="property-content">

                <h3>
                    ${property.title}
                </h3>


                <p class="property-location">

                    <i class="fa-solid fa-location-dot"></i>

                    ${property.location}

                </p>


                <div class="property-price">

                    ${formatPrice(
                        property.price,
                        property.mode
                    )}

                </div>


                <div class="property-meta">

                    ${
                        property.bedrooms > 0
                            ? `<span>
                                <i class="fa-solid fa-bed"></i>
                                ${property.bedrooms} Beds
                               </span>`
                            : ""
                    }

                    ${
                        property.bathrooms > 0
                            ? `<span>
                                <i class="fa-solid fa-bath"></i>
                                ${property.bathrooms} Baths
                               </span>`
                            : ""
                    }

                    ${
                        property.area
                            ? `<span>
                                <i class="fa-solid fa-ruler-combined"></i>
                                ${property.area} sq.ft
                               </span>`
                            : ""
                    }

                </div>


                <div class="property-actions">

                    <button
                        onclick="showPropertyDetails(${property.id})"
                        class="primary-small"
                    >
                        View Details
                    </button>

                    <button
                        onclick="addToCompare(${property.id})"
                        class="${isCompared ? "compare-selected" : ""}"
                    >
                        ${
                            isCompared
                                ? "Compared ✓"
                                : "Compare"
                        }
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   RENDER PROPERTIES
========================================================= */

function renderProperties() {

    if (!propertyGrid) return;

    const location =
        document.getElementById("filterLocation")?.value || "";

    const type =
        document.getElementById("filterType")?.value || "";

    const bedrooms =
        document.getElementById("filterBedrooms")?.value || "";

    const sort =
        document.getElementById("sortProperties")?.value || "default";


    let list =
        [...getAllProperties()];


    if (currentListing !== "All") {

        list = list.filter(
            property =>
                property.mode === currentListing
        );

    }


    if (location) {

        list = list.filter(
            property =>
                property.location === location
        );

    }


    if (type) {

        list = list.filter(
            property =>
                property.type === type
        );

    }


    if (bedrooms) {

        list = list.filter(
            property =>
                Number(property.bedrooms) >=
                Number(bedrooms)
        );

    }


    if (sort === "low") {

        list.sort(
            (a, b) => Number(a.price) - Number(b.price)
        );

    }


    if (sort === "high") {

        list.sort(
            (a, b) => Number(b.price) - Number(a.price)
        );

    }


    if (!list.length) {

        propertyGrid.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-house-circle-exclamation"></i>

                <h3>
                    No Properties Found
                </h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>

        `;

        return;

    }


    propertyGrid.innerHTML =
        list.map(createPropertyCard).join("");

    animatePropertyCards();

}


/* =========================================================
   FEATURED PROPERTIES
========================================================= */

function renderFeatured() {

    if (!featuredProperties) return;

    const list =
        getAllProperties().slice(0, 6);

    featuredProperties.innerHTML =
        list.map(createPropertyCard).join("");

    animatePropertyCards(
        featuredProperties
    );

}


/* =========================================================
   PROPERTY CARD ANIMATION
========================================================= */

function animatePropertyCards(container = document) {

    const cards =
        container.querySelectorAll(
            ".property-card"
        );

    cards.forEach(
        (card, index) => {

            card.style.opacity = "0";
            card.style.transform =
                "translateY(18px)";

            card.style.transition =
                `opacity .45s ease ${index * 0.05}s,
                 transform .45s ease ${index * 0.05}s`;

            requestAnimationFrame(
                () => {

                    card.style.opacity = "1";
                    card.style.transform =
                        "translateY(0)";

                }
            );

        }
    );

}


/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(id) {

    id = Number(id);

    const index =
        favorites.indexOf(id);


    if (index === -1) {

        favorites.push(id);

        showToast(
            "Property added to favorites ❤️"
        );

    } else {

        favorites.splice(index, 1);

        showToast(
            "Property removed from favorites"
        );

    }


    localStorage.setItem(
        "estatehubFavorites",
        JSON.stringify(favorites)
    );


    renderProperties();
    renderFeatured();
    renderFavorites();

}


function renderFavorites() {

    if (!favoriteGrid) return;

    const list =
        getAllProperties().filter(
            property =>
                favorites.includes(property.id)
        );


    if (!list.length) {

        favoriteGrid.innerHTML = `

            <div class="empty-state">

                <i class="fa-regular fa-heart"></i>

                <h3>
                    No Favorite Properties
                </h3>

                <p>
                    Save properties you love and find them here.
                </p>

            </div>

        `;

        return;

    }


    favoriteGrid.innerHTML =
        list.map(createPropertyCard).join("");

    animatePropertyCards(
        favoriteGrid
    );

}


/* =========================================================
   PROPERTY DETAILS
========================================================= */

function showPropertyDetails(id) {

    const property =
        getPropertyById(id);

    if (!property) return;


    const details =
        document.getElementById(
            "propertyDetails"
        );

    if (!details) return;


    details.innerHTML = `

        <img
            class="property-detail-image"
            src="${property.image}"
            alt="${property.title}"
        >


        <span class="property-badge">
            ${property.mode}
        </span>


        <h2>
            ${property.title}
        </h2>


        <p class="property-location">

            <i class="fa-solid fa-location-dot"></i>

            ${property.location}

        </p>


        <div class="property-detail-price">

            ${formatPrice(
                property.price,
                property.mode
            )}

        </div>


        <div class="property-detail-meta">

            ${
                property.bedrooms > 0
                    ? `<span>
                        <i class="fa-solid fa-bed"></i>
                        ${property.bedrooms} Bedrooms
                       </span>`
                    : ""
            }

            ${
                property.bathrooms > 0
                    ? `<span>
                        <i class="fa-solid fa-bath"></i>
                        ${property.bathrooms} Bathrooms
                       </span>`
                    : ""
            }

            ${
                property.area
                    ? `<span>
                        <i class="fa-solid fa-ruler-combined"></i>
                        ${property.area} sq.ft
                       </span>`
                    : ""
            }

        </div>


        <p>
            ${property.description}
        </p>


        <div
            style="
                display:flex;
                gap:10px;
                flex-wrap:wrap;
                margin-top:18px;
            "
        >

            <button
                class="primary-btn"
                onclick="openEMIForProperty(${property.id})"
            >

                <i class="fa-solid fa-calculator"></i>

                Calculate EMI

            </button>


            <button
                class="primary-small"
                onclick="toggleFavorite(${property.id}); showPropertyDetails(${property.id})"
            >

                <i class="${
                    favorites.includes(property.id)
                        ? "fa-solid fa-heart"
                        : "fa-regular fa-heart"
                }"></i>

                ${
                    favorites.includes(property.id)
                        ? "Saved"
                        : "Save Property"
                }

            </button>

        </div>

    `;


    openModal(propertyModal);

}


/* =========================================================
   MODAL HELPERS
========================================================= */

function openModal(modal) {

    if (!modal) return;

    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function closeAllModals() {

    document
        .querySelectorAll(".modal")
        .forEach(
            modal =>
                modal.classList.remove("show")
        );

    document.body.style.overflow = "";

}


/* =========================================================
   CLOSE MODALS
========================================================= */

document
    .querySelectorAll(".close-modal")
    .forEach(button => {

        button.addEventListener(
            "click",
            closeAllModals
        );

    });


document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (event.target === modal) {

                    closeAllModals();

                }

            }
        );

    });


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeAllModals();

        }

    }
);


/* =========================================================
   LIST PROPERTY MODAL
========================================================= */

document
    .getElementById("openListingBtn")
    ?.addEventListener(
        "click",
        () => {

            openModal(listingModal);

        }
    );


/* =========================================================
   LOGIN MODAL
========================================================= */

document
    .getElementById("loginBtn")
    ?.addEventListener(
        "click",
        () => {

            openModal(loginModal);

        }
    );


/* =========================================================
   MOBILE MENU
========================================================= */

menuToggle?.addEventListener(
    "click",
    () => {

        navMenu?.classList.toggle("active");

    }
);


document
    .querySelectorAll(".nav-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu?.classList.remove(
                    "active"
                );

            }
        );

    });


/* =========================================================
   BUY / RENT TOGGLE
========================================================= */

document
    .querySelectorAll(".toggle-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".toggle-btn")
                    .forEach(
                        btn =>
                            btn.classList.remove("active")
                    );

                button.classList.add("active");


                const listing =
                    button.dataset.listing;


                currentListing =
                    listing || "All";


                document
                    .querySelectorAll(
                        ".property-listing-btn"
                    )
                    .forEach(btn => {

                        btn.classList.toggle(
                            "active",
                            btn.dataset.listing ===
                                currentListing
                        );

                    });


                renderProperties();

                document
                    .getElementById("properties")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =========================================================
   PROPERTY FILTER TOGGLE
========================================================= */

document
    .querySelectorAll(".property-listing-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".property-listing-btn"
                    )
                    .forEach(
                        btn =>
                            btn.classList.remove("active")
                    );


                button.classList.add("active");


                currentListing =
                    button.dataset.listing ||
                    "All";


                renderProperties();

            }
        );

    });


/* =========================================================
   PROPERTY FILTERS
========================================================= */

[
    "filterLocation",
    "filterType",
    "filterBedrooms",
    "sortProperties"
].forEach(id => {

    document
        .getElementById(id)
        ?.addEventListener(
            "change",
            renderProperties
        );

});


/* =========================================================
   RESET FILTERS HELPER
========================================================= */

function resetPropertyFilters() {

    [
        "filterLocation",
        "filterType",
        "filterBedrooms"
    ].forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.value = "";

        }

    });


    const sort =
        document.getElementById(
            "sortProperties"
        );

    if (sort) {

        sort.value = "default";

    }

}


/* =========================================================
   HOME SEARCH
========================================================= */

document
    .getElementById("homeSearchBtn")
    ?.addEventListener(
        "click",
        () => {

            const location =
                document.getElementById(
                    "homeLocation"
                )?.value || "";


            const type =
                document.getElementById(
                    "homeType"
                )?.value || "";


            const bedrooms =
                document.getElementById(
                    "homeBedrooms"
                )?.value || "";


            const budget =
                document.getElementById(
                    "homeBudget"
                )?.value || "";


            const activeToggle =
                document.querySelector(
                    ".toggle-btn.active"
                );


            if (activeToggle) {

                currentListing =
                    activeToggle.dataset.listing ||
                    "All";

            }


            document
                .querySelectorAll(
                    ".property-listing-btn"
                )
                .forEach(btn => {

                    btn.classList.toggle(
                        "active",
                        btn.dataset.listing ===
                            currentListing
                    );

                });


            const locationFilter =
                document.getElementById(
                    "filterLocation"
                );


            const typeFilter =
                document.getElementById(
                    "filterType"
                );


            const bedroomFilter =
                document.getElementById(
                    "filterBedrooms"
                );


            if (locationFilter)
                locationFilter.value =
                    location;


            if (typeFilter)
                typeFilter.value =
                    type;


            if (bedroomFilter)
                bedroomFilter.value =
                    bedrooms;


            let result =
                getAllProperties().filter(
                    property => {

                        const modeMatch =
                            currentListing === "All" ||
                            property.mode ===
                                currentListing;


                        const locationMatch =
                            !location ||
                            property.location ===
                                location;


                        const typeMatch =
                            !type ||
                            property.type ===
                                type;


                        const bedroomMatch =
                            !bedrooms ||
                            Number(property.bedrooms) >=
                                Number(bedrooms);


                        let budgetMatch = true;


                        if (budget === "50") {

                            budgetMatch =
                                property.price <
                                5000000;

                        }


                        if (budget === "100") {

                            budgetMatch =
                                property.price >=
                                    5000000 &&
                                property.price <=
                                    10000000;

                        }


                        if (budget === "200") {

                            budgetMatch =
                                property.price >
                                    10000000 &&
                                property.price <=
                                    20000000;

                        }


                        if (budget === "201") {

                            budgetMatch =
                                property.price >
                                20000000;

                        }


                        return (
                            modeMatch &&
                            locationMatch &&
                            typeMatch &&
                            bedroomMatch &&
                            budgetMatch
                        );

                    }
                );


            if (propertyGrid) {

                if (!result.length) {

                    propertyGrid.innerHTML = `

                        <div class="empty-state">

                            <i class="fa-solid fa-magnifying-glass"></i>

                            <h3>
                                No Matching Properties
                            </h3>

                            <p>
                                Try adjusting your search criteria.
                            </p>

                        </div>

                    `;

                } else {

                    propertyGrid.innerHTML =
                        result
                            .map(createPropertyCard)
                            .join("");

                    animatePropertyCards();

                }

            }


            document
                .getElementById("properties")
                ?.scrollIntoView({
                    behavior: "smooth"
                });


            showToast(
                result.length +
                " properties found"
            );

        }
    );


/* =========================================================
   CATEGORY FUNCTIONALITY
========================================================= */

document
    .querySelectorAll(".category-card")
    .forEach(card => {

        const exploreButton =
            card.querySelector(
                "button"
            );


        function selectCategory() {

            const category =
                card.dataset.category;

            if (!category) return;


            document
                .querySelectorAll(
                    ".category-card"
                )
                .forEach(
                    item =>
                        item.classList.remove("active")
                );


            card.classList.add("active");


            resetPropertyFilters();


            const typeFilter =
                document.getElementById(
                    "filterType"
                );


            if (typeFilter) {

                typeFilter.value =
                    category;

            }


            currentListing =
                "All";


            document
                .querySelectorAll(
                    ".property-listing-btn"
                )
                .forEach(btn => {

                    btn.classList.toggle(
                        "active",
                        btn.dataset.listing ===
                            "All"
                    );

                });


            renderProperties();


            document
                .getElementById("properties")
                ?.scrollIntoView({
                    behavior: "smooth"
                });


            showToast(
                "Showing " +
                category +
                " properties"
            );

        }


        card.addEventListener(
            "click",
            event => {

                if (
                    exploreButton &&
                    event.target.closest("button")
                ) {

                    event.stopPropagation();

                }

                selectCategory();

            }
        );


        exploreButton?.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                selectCategory();

            }
        );

    });


/* =========================================================
   COMPARE PROPERTIES
========================================================= */

function addToCompare(id) {

    id = Number(id);

    const property =
        getPropertyById(id);

    if (!property) return;


    if (compareList.includes(id)) {

        showToast(
            "Property already in comparison"
        );

        openModal(compareModal);

        renderCompare();

        return;

    }


    if (compareList.length >= 3) {

        showToast(
            "You can compare up to 3 properties"
        );

        openModal(compareModal);

        renderCompare();

        return;

    }


    compareList.push(id);


    localStorage.setItem(
        "estatehubCompare",
        JSON.stringify(compareList)
    );


    showToast(
        "Property added to comparison ⚖️"
    );


    renderCompare();

    renderProperties();

    renderFeatured();

}


function removeFromCompare(id) {

    id = Number(id);


    compareList =
        compareList.filter(
            item =>
                Number(item) !== id
        );


    localStorage.setItem(
        "estatehubCompare",
        JSON.stringify(compareList)
    );


    renderCompare();

    renderProperties();

    renderFeatured();


    showToast(
        "Property removed from comparison"
    );

}


function clearCompare() {

    compareList = [];


    localStorage.setItem(
        "estatehubCompare",
        JSON.stringify(compareList)
    );


    renderCompare();

    renderProperties();

    renderFeatured();


    showToast(
        "Comparison cleared"
    );

}


function renderCompare() {

    const content =
        document.getElementById(
            "compareContent"
        );

    if (!content) return;


    const list =
        getAllProperties().filter(
            property =>
                compareList.includes(property.id)
        );


    if (!list.length) {

        content.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-scale-balanced"></i>

                <h3>
                    No Properties Selected
                </h3>

                <p>
                    Add up to 3 properties using the Compare button.
                </p>

            </div>

        `;

        return;

    }


    content.innerHTML = `

        <div
            style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:12px;
                margin-bottom:18px;
                flex-wrap:wrap;
            "
        >

            <strong>
                ${list.length} of 3 properties selected
            </strong>


            <button
                onclick="clearCompare()"
                class="primary-small"
            >
                Clear Comparison
            </button>

        </div>


        <div style="overflow-x:auto;">

            <table class="compare-table">

                <thead>

                    <tr>

                        <th>
                            Feature
                        </th>

                        ${list.map(
                            property => `

                                <th>

                                    <div
                                        style="
                                            display:flex;
                                            flex-direction:column;
                                            gap:8px;
                                        "
                                    >

                                        <img
                                            src="${property.image}"
                                            alt="${property.title}"
                                            style="
                                                width:100%;
                                                max-width:130px;
                                                height:75px;
                                                object-fit:cover;
                                                border-radius:8px;
                                            "
                                        >

                                        <span>
                                            ${property.title}
                                        </span>

                                        <button
                                            onclick="removeFromCompare(${property.id})"
                                            class="primary-small"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </th>

                            `
                        ).join("")}

                    </tr>

                </thead>


                <tbody>

                    <tr>

                        <td>
                            Price
                        </td>

                        ${list.map(
                            property =>
                                `<td>
                                    ${formatPrice(
                                        property.price,
                                        property.mode
                                    )}
                                </td>`
                        ).join("")}

                    </tr>


                    <tr>

                        <td>
                            Location
                        </td>

                        ${list.map(
                            property =>
                                `<td>
                                    ${property.location}
                                </td>`
                        ).join("")}

                    </tr>


                    <tr>

                        <td>
                            Type
                        </td>

                        ${list.map(
                            property =>
                                `<td>
                                    ${property.type}
                                </td>`
                        ).join("")}

                    </tr>


                    <tr>

                        <td>
                            Mode
                        </td>

                        ${list.map(
                            property =>
                                `<td>
                                    ${property.mode}
                                </td>`
                        ).join("")}

                    </tr>


                    <tr>

                        <td>
                            Bedrooms
                        </td>

                        ${list.map(
                            property =>
                                `<td>
                                    ${property.bedrooms || "-"}
                                </td>`
                        ).join("")}

                    </tr>


                    <tr>

                        <td>
                            Bathrooms
                        </td>

                        ${list.map(
                            property =>
                                `<td>
                                    ${property.bathrooms || "-"}
                                </td>`
                        ).join("")}

                    </tr>


                    <tr>

                        <td>
                            Area
                        </td>

                        ${list.map(
                            property =>
                                `<td>
                                    ${
                                        property.area
                                            ? property.area + " sq.ft"
                                            : "-"
                                    }
                                </td>`
                        ).join("")}

                    </tr>

                </tbody>

            </table>

        </div>

    `;

}


/* =========================================================
   OPEN COMPARE FROM QUICK FEATURES
========================================================= */

document.addEventListener(
    "click",
    event => {

        const feature =
            event.target.closest(
                ".quick-feature"
            );


        if (!feature) return;


        const text =
            feature.textContent
                .toLowerCase();


        const icon =
            feature.querySelector("i");


        const iconClass =
            icon?.className || "";


        if (
            text.includes("compare") ||
            iconClass.includes("scale-balanced")
        ) {

            renderCompare();

            openModal(compareModal);

        }


        if (
            text.includes("emi") ||
            iconClass.includes("calculator")
        ) {

            openModal(emiModal);

        }

    }
);


/* =========================================================
   EMI CALCULATOR
========================================================= */

function openEMIForProperty(id) {

    const property =
        getPropertyById(id);

    if (!property) return;


    const priceInput =
        document.getElementById(
            "propertyPrice"
        );


    if (priceInput) {

        priceInput.value =
            property.price;

    }


    closeAllModals();

    openModal(emiModal);

}


document
    .getElementById("emiForm")
    ?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const price =
                Number(
                    document.getElementById(
                        "propertyPrice"
                    )?.value
                );


            const downPayment =
                Number(
                    document.getElementById(
                        "downPayment"
                    )?.value
                );


            const years =
                Number(
                    document.getElementById(
                        "loanPeriod"
                    )?.value
                );


            const rate =
                Number(
                    document.getElementById(
                        "interestRate"
                    )?.value
                );


            if (
                !Number.isFinite(price) ||
                !Number.isFinite(downPayment) ||
                !Number.isFinite(years) ||
                !Number.isFinite(rate) ||
                price <= 0 ||
                downPayment < 0 ||
                downPayment >= price ||
                years <= 0 ||
                rate <= 0
            ) {

                showToast(
                    "Please enter valid EMI details"
                );

                return;

            }


            const principal =
                price - downPayment;


            const monthlyRate =
                rate / 12 / 100;


            const months =
                years * 12;


            const emi =
                principal *
                monthlyRate *
                Math.pow(
                    1 + monthlyRate,
                    months
                ) /
                (
                    Math.pow(
                        1 + monthlyRate,
                        months
                    ) - 1
                );


            const result =
                document.getElementById(
                    "emiResult"
                );


            if (!result) return;


            result.innerHTML = `

                <span>
                    Estimated Monthly EMI
                </span>

                <strong>
                    ₹${Math.round(
                        emi
                    ).toLocaleString("en-IN")}
                </strong>

                <small>
                    Loan amount:
                    ₹${principal.toLocaleString("en-IN")}
                    for ${years} years at ${rate}% interest.
                </small>

            `;


            result.style.animation =
                "modalEnter .35s ease";


            showToast(
                "EMI calculated successfully 🧮"
            );

        }
    );


/* =========================================================
   LIST PROPERTY
========================================================= */

document
    .getElementById("listingForm")
    ?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const title =
                document.getElementById(
                    "listingTitle"
                )?.value.trim();


            const type =
                document.getElementById(
                    "listingType"
                )?.value;


            const mode =
                document.getElementById(
                    "listingMode"
                )?.value;


            const location =
                document.getElementById(
                    "listingLocation"
                )?.value.trim();


            const price =
                Number(
                    document.getElementById(
                        "listingPrice"
                    )?.value
                );


            const bedrooms =
                Number(
                    document.getElementById(
                        "listingBedrooms"
                    )?.value
                ) || 0;


            const bathrooms =
                Number(
                    document.getElementById(
                        "listingBathrooms"
                    )?.value
                ) || 0;


            const area =
                Number(
                    document.getElementById(
                        "listingArea"
                    )?.value
                ) || 0;


            const image =
                document.getElementById(
                    "listingImage"
                )?.value.trim();


            const phone =
                document.getElementById(
                    "listingPhone"
                )?.value.trim();


            const description =
                document.getElementById(
                    "listingDescription"
                )?.value.trim();


            if (
                !title ||
                !type ||
                !mode ||
                !location ||
                !price ||
                price <= 0 ||
                !phone ||
                !description
            ) {

                showToast(
                    "Please complete all required property details"
                );

                return;

            }


            const newProperty = {

                id:
                    Date.now(),

                title:
                    title,

                type:
                    type,

                mode:
                    mode,

                location:
                    location,

                price:
                    price,

                bedrooms:
                    bedrooms,

                bathrooms:
                    bathrooms,

                area:
                    area,

                image:
                    image ||
                    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",

                phone:
                    phone,

                description:
                    description

            };


            userListings.push(
                newProperty
            );


            localStorage.setItem(
                "estatehubListings",
                JSON.stringify(userListings)
            );


            event.target.reset();


            closeAllModals();


            resetPropertyFilters();


            currentListing =
                "All";


            renderProperties();

            renderFeatured();

            renderFavorites();


            showToast(
                "Property listed successfully! 🏠"
            );


            setTimeout(
                () => {

                    document
                        .getElementById("properties")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                },
                400
            );

        }
    );


/* =========================================================
   LOGIN
========================================================= */

document
    .getElementById("loginForm")
    ?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                )?.value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                )?.value.trim();


            if (
                !email ||
                !password
            ) {

                showToast(
                    "Please enter your login details"
                );

                return;

            }


            closeAllModals();


            showToast(
                "Login successful! 👋"
            );


            event.target.reset();

        }
    );


/* =========================================================
   CONTACT FORM
========================================================= */

document
    .getElementById("contactForm")
    ?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "contactName"
                )?.value.trim();


            const email =
                document.getElementById(
                    "contactEmail"
                )?.value.trim();


            const message =
                document.getElementById(
                    "contactMessage"
                )?.value.trim();


            if (
                !name ||
                !email ||
                !message
            ) {

                showToast(
                    "Please complete the contact form"
                );

                return;

            }


            showToast(
                "Thank you " +
                name +
                "! Your message has been sent. 💬"
            );


            event.target.reset();

        }
    );


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    if (!toast) return;


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


function initializeReveal() {

    document
        .querySelectorAll(
            ".quick-feature, .category-card, .feedback-card"
        )
        .forEach(
            element => {

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(25px)";

                element.style.transition =
                    "opacity .7s ease, transform .7s ease";

                revealObserver.observe(
                    element
                );

            }
        );

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function initializeNavbarEffect() {

    const navbar =
        document.querySelector(
            ".navbar"
        );

    if (!navbar) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 30) {

                navbar.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,.18)";

            } else {

                navbar.style.boxShadow =
                    "none";

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   SMOOTH INTERNAL NAVIGATION
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) return;


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                navMenu?.classList.remove(
                    "active"
                );

            }
        );

    });


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderFeatured();

        renderProperties();

        renderFavorites();

        renderCompare();

        initializeReveal();

        initializeNavbarEffect();

    }
);