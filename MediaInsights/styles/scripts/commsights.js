var CommSights = function() {
    var getIcon = function (type) {
        switch (type) {
            case 'success':
                return "check-circle";
            case 'warning':
                return 'warning';
            case 'danger':
                return 'times-circle';
            case "info":
                return 'info-circle';
        };
    }

    return {
    	alert: function (message, type, icon, container) {
            icon = icon === undefined ? getIcon(type) : icon;
            container = typeof container !== 'undefined' ? container : '#bootstrap_alerts';

            return Metronic.alert({
            	container: container,
                place: 'append',
                type: type,  // success, danger, info, warning
                message: message,
                close: true,
                focus: true,
                reset: true,
                icon: icon
            });
        }
    };
}();