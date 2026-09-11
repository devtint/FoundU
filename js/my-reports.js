console.log("My Reports JS is running!");

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ========================================
// ELEMENTS
// ========================================

const reportList =
    document.getElementById("my-report-list");

const allTab =
    document.getElementById("all-tab");

const lostTab =
    document.getElementById("lost-tab");

const foundTab =
    document.getElementById("found-tab");


// ========================================
// DATA
// ========================================

let myReports = [];

let currentFilter = "all";


// ========================================
// AUTHENTICATION
// ========================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        console.log("No user logged in.");

        window.location.href = "login.html";

        return;
    }

    console.log("Logged in:", user.email);
    console.log("UID:", user.uid);

    await loadMyReports(user.uid);
});


// ========================================
// LOAD MY REPORTS
// ========================================

async function loadMyReports(userId) {

    reportList.innerHTML =
        "<p>Loading your reports...</p>";

    try {

        const reportsQuery = query(
            collection(db, "items"),
            where("userId", "==", userId)
        );

        const querySnapshot =
            await getDocs(reportsQuery);

        myReports = [];

        querySnapshot.forEach((docSnapshot) => {

            myReports.push({
                id: docSnapshot.id,
                ...docSnapshot.data()
            });

        });

        console.log(
            "My reports:",
            myReports
        );

        displayReports();

    } catch (error) {

        console.error(
            "Error loading reports:",
            error
        );

        reportList.innerHTML =
            "<p>Failed to load your reports.</p>";
    }
}


// ========================================
// DISPLAY REPORTS
// ========================================

function displayReports() {

    let filteredReports = myReports;

    // Filter
    if (currentFilter !== "all") {

        filteredReports =
            myReports.filter((report) => {

                return report.type === currentFilter;

            });
    }


    // No reports
    if (filteredReports.length === 0) {

        reportList.innerHTML = `
            <div class="no-reports">
                <h3>No reports found</h3>
                <p>
                    You have not reported any
                    ${currentFilter === "all"
                ? "items"
                : currentFilter + " items"} yet.
                </p>
            </div>
        `;

        return;
    }


    reportList.innerHTML = "";


    // Create cards
    filteredReports.forEach((report) => {

        const article =
            document.createElement("article");

        article.className =
            "my-report-card";


        // ========================================
        // IMAGE
        // ========================================

        let imageHTML = "";

        if (report.imageURL) {

            imageHTML = `
                <div class="my-report-image">
                    <img
                        src="${report.imageURL}"
                        alt="${escapeHTML(
                report.itemName || "Item"
            )}"
                    >
                </div>
            `;

        } else {

            imageHTML = `
                <div class="my-report-image">
                    Item Photo
                </div>
            `;
        }


        // ========================================
        // DATE
        // ========================================

        let reportDate = "Unknown date";

        if (report.createdAt && report.createdAt.toDate) {

            reportDate =
                report.createdAt
                    .toDate()
                    .toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    });

        } else if (report.lostDate) {

            reportDate =
                formatDate(report.lostDate);

        } else if (report.foundDate) {

            reportDate =
                formatDate(report.foundDate);
        }


        // ========================================
        // CARD
        // ========================================

        article.innerHTML = `

            ${imageHTML}

            <div class="my-report-content">

                <span class="item-status ${report.type}">
    ${capitalize(report.type)}
</span>

<span class="report-status">
    ${capitalize(report.status || "active")}
</span>

                <h2>
                    ${escapeHTML(
            report.itemName ||
            "Unnamed Item"
        )}
                </h2>

                <p>
                    📍 ${escapeHTML(
            report.location ||
            "Unknown location"
        )}
                </p>

                <small>
                    Reported: ${reportDate}
                </small>

            </div>


            <div class="my-report-actions">
    <button
        type="button"
        class="btn secondary-btn view-btn"
    >
        View Details
    </button>

    <button
        type="button"
        class="btn resolve-btn"
    >
        Mark Resolved
    </button>

    <button
        type="button"
        class="btn delete-btn"
    >
        Delete
    </button>
</div>
        `;


        // ========================================
        // VIEW DETAILS
        // ========================================

        const viewButton =
            article.querySelector(".view-btn");

        viewButton.addEventListener(
            "click",
            () => {

                localStorage.setItem(
                    "selectedItemId",
                    report.id
                );

                window.location.href =
                    "item-details.html";
            }
        );

        // ========================================
        // MARK AS RESOLVED
        // ========================================

        const resolveButton =
            article.querySelector(".resolve-btn");

if (report.status === "resolved") {

    resolveButton.textContent = t("Resolved");
    resolveButton.disabled = true;

} else {

    resolveButton.addEventListener(
        "click",
        async () => {

            const confirmed =
                confirm(
                    `Mark "${report.itemName}" as resolved?`
                );

            if (!confirmed) {
                return;
            }

            await resolveReport(report.id);
        }
    );
}

        

        // ========================================
        // DELETE
        // ========================================

        const deleteButton =
            article.querySelector(".delete-btn");

        deleteButton.addEventListener(
            "click",
            async () => {

                const confirmed =
                    confirm(
                        `Delete "${report.itemName}"?`
                    );

                if (!confirmed) {
                    return;
                }

                await deleteReport(
                    report.id
                );
            }
        );


        reportList.appendChild(article);
    });
}

// ========================================
        // RESOLVE REPORT
        // ========================================

        async function resolveReport(reportId) {
            try {

                await updateDoc(
                    doc(db, "items", reportId),
                    {
                        status: "resolved"
                    }
                );

                console.log(
                    "Report marked as resolved:",
                    reportId
                );

                myReports =
                    myReports.map((report) => {

                        if (report.id === reportId) {
                            return {
                                ...report,
                                status: "resolved"
                            };
                        }

                        return report;
                    });

                displayReports();

            } catch (error) {

                console.error(
                    "Resolve error:",
                    error
                );

                alert(
                    t("Failed to mark the report as resolved.")
                );
            }
        }

// ========================================
// DELETE REPORT
// ========================================

async function deleteReport(reportId) {

    try {

        await deleteDoc(
            doc(db, "items", reportId)
        );

        console.log(
            "Report deleted:",
            reportId
        );

        myReports =
            myReports.filter(
                (report) =>
                    report.id !== reportId
            );

        displayReports();

    } catch (error) {

        console.error(
            "Delete error:",
            error
        );

        alert(
            t("Failed to delete the report.")
        );
    }
}


// ========================================
// TABS
// ========================================

allTab.addEventListener(
    "click",
    () => {

        currentFilter = "all";

        setActiveTab(allTab);

        displayReports();
    }
);


lostTab.addEventListener(
    "click",
    () => {

        currentFilter = "lost";

        setActiveTab(lostTab);

        displayReports();
    }
);


foundTab.addEventListener(
    "click",
    () => {

        currentFilter = "found";

        setActiveTab(foundTab);

        displayReports();
    }
);


// ========================================
// ACTIVE TAB
// ========================================

function setActiveTab(activeTab) {

    document
        .querySelectorAll(".report-tab")
        .forEach((tab) => {

            tab.classList.remove("active");

        });

    activeTab.classList.add("active");
}


// ========================================
// HELPERS
// ========================================

function capitalize(text) {

    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase()
        + text.slice(1);
}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


function formatDate(dateString) {

    const date =
        new Date(dateString);

    if (isNaN(date)) {
        return dateString;
    }

    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}