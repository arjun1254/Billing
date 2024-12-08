
   function openChangePasswordPopup() {
            document.getElementById("changePasswordPopup").style.display = "flex";
        }

        function closeChangePasswordPopup() {
            document.getElementById("changePasswordPopup").style.display = "none";
        }

        function changePassword() {
            // Add your password change logic here
            alert("Password changed successfully!");
            closeChangePasswordPopup();
        }

        function openLogoutPopup() {
            document.getElementById("logoutPopup").style.display = "flex";
        }

        function closeLogoutPopup() {
            document.getElementById("logoutPopup").style.display = "none";
        }

        function confirmLogout() {
            // Add your logout logic here
            alert("Logged out successfully!");
            closeLogoutPopup();
        }

        function openViewAddItemsPopup() {
            document.getElementById("viewAddItemsPopup").style.display = "flex";
        }

        function closeViewAddItemsPopup() {
            document.getElementById("viewAddItemsPopup").style.display = "none";
        }

        function addItem() {
            const itemId = document.getElementById("itemId").value;
            const itemNumber = document.getElementById("itemNumber").value;
            const unit = document.getElementById("unit").value;
            const buyingPrice = document.getElementById("buyingPrice").value;
            const sellingPrice = document.getElementById("sellingPrice").value;
            const quantity = document.getElementById("quantity").value;
            const expireDate = document.getElementById("expireDate").value;
            const description = document.getElementById("description").value;

            const table = document.getElementById("itemsTable").getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();

            newRow.innerHTML = `
                <td>${itemId}</td>
                <td>${itemNumber}</td>
                <td>${unit}</td>
                <td>${buyingPrice}</td>
                <td>${sellingPrice}</td>
                <td>${quantity}</td>
                <td>${expireDate}</td>
                <td>${description}</td>
            `;

            // Clear input fields
            document.getElementById("itemId").value = '';
            document.getElementById("itemNumber").value = '';
            document.getElementById("unit").value = '';
            document.getElementById("buyingPrice").value = '';
            document.getElementById("sellingPrice").value = '';
            document.getElementById("quantity").value = '';
            document.getElementById("expireDate").value = '';
            document.getElementById("description").value = '';

            alert("Item added successfully!");
        }

        function searchItems() {
            const input = document.getElementById("searchBar");
            const filter = input.value.toUpperCase();
            const table = document.getElementById("itemsTable");
            const tr = table.getElementsByTagName("tr");

            for (let i = 1; i < tr.length; i++) {
                const td = tr[i].getElementsByTagName("td");
                let match = false;
                for (let j = 0; j < td.length; j++) {
                    if (td[j]) {
                        if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                            match = true;
                            break;
                        }
                    }
                }
                if (match) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
  