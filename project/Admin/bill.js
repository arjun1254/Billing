
        function saveAndPrint() {
            // Generate the bill details
            const billNo = document.getElementById('billNo').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const contactNo = document.getElementById('contactNo').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const productId = document.getElementById('productId').value;
            const productName = document.getElementById('productName').value;
            const price = document.getElementById('price').value;
            const quantity = document.getElementById('quantity').value;
            const description = document.getElementById('description').value;
            const subtotal = document.getElementById('subtotal').value;
            const discount = document.getElementById('discount').value;
            const taxableAmount = document.getElementById('taxableAmount').value;
            const vat = document.getElementById('vat').value;
            const total = document.getElementById('total').value;
            const paymentOptions = document.getElementById('paymentOptions').value;
            const cashProvided = document.getElementById('cashProvided').value;
            const returnAmount = document.getElementById('returnAmount').innerText;

            // Create a new window for printing
            const printWindow = window.open('', '', 'height=600,width=800');
            printWindow.document.write('<html><head><title>Invoice</title>');
            printWindow.document.write('</head><body >');
            printWindow.document.write('<h1>Invoice</h1>');
            printWindow.document.write('<p>Bill No: ' + billNo + '</p>');
            printWindow.document.write('<p>Date: ' + date + '</p>');
            printWindow.document.write('<p>Time: ' + time + '</p>');
            printWindow.document.write('<h3>Customer Details</h3>');
            printWindow.document.write('<p>Contact No: ' + contactNo + '</p>');
            printWindow.document.write('<p>Name: ' + name + '</p>');
            printWindow.document.write('<p>Email: ' + email + '</p>');
            printWindow.document.write('<p>Address: ' + address + '</p>');
            printWindow.document.write('<h3>Product Details</h3>');
            printWindow.document.write('<p>Product ID: ' + productId + '</p>');
            printWindow.document.write('<p>Product Name: ' + productName + '</p>');
            printWindow.document.write('<p>Price: ' + price + '</p>');
            printWindow.document.write('<p>Quantity: ' + quantity + '</p>');
            printWindow.document.write('<p>Description: ' + description + '</p>');
            printWindow.document.write('<h3>Summary</h3>');
            printWindow.document.write('<p>Subtotal: ' + subtotal + '</p>');
            printWindow.document.write('<p>Discount: ' + discount + '</p>');
            printWindow.document.write('<p>Taxable Amount: ' + taxableAmount + '</p>');
            printWindow.document.write('<p>Vat: ' + vat + '</p>');
            printWindow.document.write('<p>Total: ' + total + '</p>');
            printWindow.document.write('<h3>Payment</h3>');
            printWindow.document.write('<p>Payment Options: ' + paymentOptions + '</p>');
            printWindow.document.write('<p>Your Total Bill: Rs. ' + total + '</p>');
            printWindow.document.write('<p>Cash Provided: ' + cashProvided + '</p>');
            printWindow.document.write('<p>Return Amount: ' + returnAmount + '</p>');
        }
        