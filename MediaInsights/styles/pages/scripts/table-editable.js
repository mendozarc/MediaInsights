var TableEditable = function () {

    var handleTable = function () {

    	var layouts;
    	function getLayouts() {
    		if (typeof layouts === 'undefined') {
    			layouts = $("#hiddenLayouts").text();
    		}

    		return layouts;
    	}

    	var editLink = '<a class="edit btn btn-xs blue" href="javascript;"><i class="fa fa-edit"></i> edit</a>';
        var deleteLink = '<a class="delete btn btn-xs red" href="javascript;"><i class="fa fa-trash-o"></i> delete</a>';
        //var openLink = '<a class="btn btn-xs green" href="javascript;"><i class="fa fa-link"></i> open layout</a>';
        var edoLinks = editLink + deleteLink;// + openLink;
        var saveLink = '<a class="edit btn btn-xs blue" href="javascript;"><i class="fa fa-save"></i> save</a>';
        var cancelLink = '<a class="cancel btn btn-xs red" href="javascript;"><i class="fa fa-times"></i> cancel</a>';
        var savecancel = saveLink + cancelLink;
        
        function restoreRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);

            for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                oTable.fnUpdate(aData[i], nRow, i, false);
            }

            oTable.fnDraw();
        }

        function editRow(oTable, nRow, isNew) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            jqTds[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[0] + '">';
            jqTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[1] + '">';
			
            var selectedText = aData[2];
        	var select = '<select id="layoutdropdown">';
        	$.each($.parseJSON(getLayouts()), function () {
        		select += '<option value="' + this.ID;
        		select += '" title="' + this.Description;
        		select += this.Name == selectedText ? '" selected="selected">' : '">';
        		select += this.Name + '</option>';
            });
        	select += '</select>';
        	jqTds[2].innerHTML = select;

            if (isNew)
                jqTds[3].innerHTML = '<input hidden="hidden" value="' + Custom.newGuid() + '">';
            else
                jqTds[3].innerHTML = $("input:hidden", nRow).prop('outerHTML');
            jqTds[3].innerHTML += savecancel;
        }

        function saveRow(oTable, nRow, isNew) {
        	var layout = $('#layoutdropdown');
        	var selectedLayoutText = layout.find(":selected").text();
        	var jqInputs = $('input', nRow);
        	ReportInfo.saveRow({
        		id: jqInputs[2].value,
        		title: jqInputs[0].value,
        		sequence: jqInputs[1].value,
        		layout: layout.val(),
        		isNew: isNew
        	});

            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate(selectedLayoutText, nRow, 2, false);
            oTable.fnUpdate(edoLinks, nRow, 3, false);
            oTable.fnDraw();
        }

        function cancelEditRow(oTable, nRow) {
            var jqInputs = $('input', nRow);
            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
            oTable.fnUpdate(edoLinks, nRow, 3, false);
            oTable.fnDraw();
        }

        var table = $('#sample_editable_1');

        var oTable = table.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            // set the initial value
            "pageLength": 10,

            "language": {
                "lengthMenu": " _MENU_ records"
            },
            "columnDefs": [{ // set default column settings
                'orderable': true,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [0, "asc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper = $("#sample_editable_1_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: true //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

        $('#sample_editable_1_new').click(function (e) {
            e.preventDefault();

            if (nNew && nEditing) {
                if (confirm("Previous row not saved. Do you want to save it ?")) {
                    saveRow(oTable, nEditing, true); // save
                    $(nEditing).find("td:first").html("Untitled");
                    nEditing = null;
                    nNew = false;

                } else {
                    oTable.fnDeleteRow(nEditing); // cancel
                    nEditing = null;
                    nNew = false;
                    
                    return;
                }
            }

            var aiNew = oTable.fnAddData(['', '', '', '', '', '']);
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editRow(oTable, nRow, true);
            nEditing = nRow;
            nNew = true;
        });

        table.on('click', '.delete', function (e) {
            e.preventDefault();

            if (confirm("Are you sure to delete this row ?") == false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];
            oTable.fnDeleteRow(nRow);

            var id = $("input:hidden", nRow).val();
            ReportInfo.deleteRow(id);
        });

        table.on('click', '.cancel', function (e) {
            e.preventDefault();
            if (nNew) {
                oTable.fnDeleteRow(nEditing);
                nEditing = null;
                nNew = false;
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
        });

        table.on('click', '.edit', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];

            if (nEditing !== null && nEditing != nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            } else if (nEditing == nRow && this.innerHTML.toLowerCase().indexOf('save') >= 0) {
            //} else if (nEditing == nRow && this.innerHTML == "Save") {
                /* Editing this row and want to save it */
                saveRow(oTable, nEditing, nNew);
                nEditing = null;
            } else {
                /* No edit in progress - let's start one */
                editRow(oTable, nRow);
                nEditing = nRow;
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable();
        }

    };
}();