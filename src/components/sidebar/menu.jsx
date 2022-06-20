import {
    Airplay,
    BarChart,
    Box,
    Calendar,
    CheckSquare,
    Clock,
    Cloud,
    Command,
    Edit,
    FileText,
    Film,
    FolderPlus,
    GitPullRequest,
    Heart,
    HelpCircle,
    Home,
    Image,
    Layers,
    List,
    Mail,
    Map,
    MessageCircle,
    Monitor,
    Package,
    Radio,
    Server,
    ShoppingBag,
    Sunrise,
    Users,
    Zap
} from 'react-feather'

export const MENUITEMS = [
    {
        menutitle:"General",
        menucontent:"Dashboards,Widgets",
        Items:[
            {
                title: 'Dashboard', icon: Home, type: 'sub',badge: "badge badge-success",badgetxt:"2", active: false, children: [
                    { path: `/dashboard/default`, title: 'Default', type: 'link' },
                    { path: `/dashboard/ecommerce`, title: 'Ecommerce', type: 'link' },
                ]
            },
            {
                title: 'Widgets', icon: Airplay, type: 'sub', active: false, children: [
                    { path: `/widgets/general`, title: 'General', type: 'link' },
                    { path: `/widgets/chart`, title: 'Chart', type: 'link' },
                ]
            },
        ]
    },

    {
        menutitle:"Applications",
        menucontent:"Ready to use Apps",
        Items:[
            {
                title: 'Project',icon:Box, type: 'sub',badge: "badge badge-danger",badgetxt:"New",active:false, children: [
                    { path: `/app/project/project-list`, type: 'link', title: 'Project List' },
                    { path: `/app/project/new-project`, type: 'link', title: 'Create New' }
                ]
            },
            {
                title: 'Ecommerce', icon:ShoppingBag, type: 'sub',active:false, children: [
                    { path: `/app/ecommerce/product`, title: 'Product', type: 'link' },
                    { path: `/app/ecommerce/product-page/1`, title: 'Product Page', type: 'link' },
                    { path: `/app/ecommerce/product-list`, title: 'Product List', type: 'link' },
                    { path: `/app/ecommerce/payment-details`, title: 'Payment Detail', type: 'link' },
                    { path: `/app/ecommerce/orderhistory`, title: 'Order History', type: 'link' },
                    { path: `/app/ecommerce/pricing`, title: 'Pricing', type: 'link' },
                ]
            },
            {
                title: 'Users', icon:Users, path:`/app/users/userProfile`, type: 'sub',bookmark:true,active:false, children: [
                    { path: `/app/users/userProfile`, type: 'link', title: 'Users Profile ' },
                    { path: `/app/users/userEdit`, type: 'link', title: 'Users Edit' },
                    { path: `/app/users/userCards`, type: 'link', title: 'Users Cards' },
                ]
            },
            {
                title: 'Calender', icon:Calendar, type: 'sub',active:false, children: [
                    { path: `/app/calendar/basic-calendar`, type: 'link', title: 'Calender', },
                    { path: `/app/calendar/draggable-calendar`, type: 'link', title: 'Draggable' },
                ]
            },
            { path: `/app/chat-app`,icon:MessageCircle, title: 'Chat-app', type: 'link' },
            { path: `/app/email-app`,icon:Mail, title: 'Email-app', type: 'link' },
            { path: `/app/file-manager`,icon:GitPullRequest, title: 'File Manager', type: 'link' },
            { path: `/app/kanban-board`,icon:Monitor,badge: "badge badge-info",badgetxt:"latest", title: 'Kanban Board', type: 'link' },
            { path: `/app/bookmark`,icon:Heart, type: 'link', title: 'Bookmark' },
            { path: `/app/task`,icon:CheckSquare, type: 'link', title: 'Task'},
            { path: `/app/social-app`,icon:Zap, type: 'link', title: 'Social App', bookmark: true },
            { path: `/app/contact`,icon:List, type: 'link', title: 'Contacts' },
            { path: `/app/todo-app/todo`,icon:Clock, type: 'link', title: 'To-Do' },
            { path: `/app/todo-app/todo-firebase`,icon:Clock, type: 'link', title: 'To-Do-Firebase' },
        
        ]
    },

    {
        menutitle:"Components",
        menucontent:"UI Components & Elements",
        Items:[
            {
                title: 'Ui-Kits', icon: Box, type: 'sub',  active: false, children: [
                    { path: `/ui-kits/statecolor`, title: 'State-color', type: 'link' },
                    { path: `/ui-kits/typography`, title: 'Typography', type: 'link' },
                    { path: `/ui-kits/avatar`, title: 'Avatars', type: 'link' },
                    { path: `/ui-kits/helperclass`, title: 'Helper-Classes  ', type: 'link' },
                    { path: `/ui-kits/grid`, title: 'Grid', type: 'link' },
                    { path: `/ui-kits/tagsandpills`, title: 'Tag & Pills', type: 'link' },
                    { path: `/ui-kits/progress-bar`, title: 'Progress', type: 'link' },
                    { path: `/ui-kits/modal`, title: 'Modal', type: 'link' },
                    { path: `/ui-kits/alert`, title: 'Alert', type: 'link' },
                    { path: `/ui-kits/popover`, title: 'Popover', type: 'link' },
                    { path: `/ui-kits/tooltips`, title: 'Tooltip', type: 'link' },
                    { path: `/ui-kits/spinner`, title: 'Spinners', type: 'link' },
                    { path: `/ui-kits/dropdown`, title: 'Dropdown ', type: 'link' },
                    { path: `/ui-kits/accordion`, title: 'Accordion', type: 'link' },
            {
                title: 'Tabs', type: 'sub', children: [
                    { title: 'Bootstrap Tabs', type: 'link', path: `/ui-kits/tab-bootstrap` },
                    { title: 'Line Tabs', type: 'link', path: `/ui-kits/tab-line` },
                ]
            },
            { path: `/ui-kits/shadow`, title: 'Shadow', type: 'link' },
            { path: `/ui-kits/list`, title: 'List', type: 'link' },
            
            ]
            },

            {
                title: 'Bonus Ui', icon: FolderPlus,  type: 'sub', badge1: true, active: false, children: [
                    { path: `/bonus-ui/scrollable`, title: 'Scrollable ', type: 'link' },
                    { path: `/bonus-ui/bootstrap-notify`, title: 'Bootstrap Notify ', type: 'link' },
                    { path: `/bonus-ui/rating`, title: 'Rating', type: 'link' },
                    { path: `/bonus-ui/dropzone`, title: 'Dropzone', type: 'link' },
                    { path: `/bonus-ui/tourComponent`, title: 'Tour ', type: 'link' },
                    { path: `/bonus-ui/sweetAlert`, title: 'SweetAlert ', type: 'link' },
                    { path: `/bonus-ui/carousel`, title: 'Owl Carousel', type: 'link' },
                    { path: `/bonus-ui/ribbons`, title: 'Ribbons', type: 'link' },
                    { path: `/bonus-ui/pagination`, title: 'Pagination', type: 'link' },
                    { path: `/bonus-ui/breadcrumb`, title: 'Breadcrumb ', type: 'link' },
                    { path: `/bonus-ui/rangeSlider`, title: 'Range Slider ', type: 'link' },
                    { path: `/bonus-ui/imageCropper`, title: 'Image Cropper ', type: 'link' },
                    { path: `/bonus-ui/stickyNotes`, title: 'Sticky ', type: 'link' },
                    { path: `/bonus-ui/dragNDropComp`, title: 'Drag and Drop ', type: 'link' },
                    { path: `/bonus-ui/image-upload`, title: 'Upload', type: 'link' },
                    { path: `/bonus-ui/card/basicCards`, title: 'Basic Card ', type: 'link' },
                    { path: `/bonus-ui/card/creativeCards`, title: 'Creative Card ', type: 'link' },
                    { path: `/bonus-ui/card/tabCard`, title: 'Tabbed Card ', type: 'link' },
                    { path: `/bonus-ui/card/draggingCards`, title: 'Draggable Card', type: 'link' },
                    { path: `/bonus-ui/timelines/timeline1`, title: 'Timeline', type: 'link' }
            ]
            },

            {
                title: 'Icons', icon: Command, path: `/icons/flagIcons`, type: 'sub', active: false, bookmark: true, children: [
                    { path: `/icons/flagIcons`, title: 'Flag Icon', type: 'link' },
                    { path: `/icons/fontAwsomeIcon`, title: 'Fontawesome Icon ', type: 'link' },
                    { path: `/icons/icoIcons`, title: 'Ico Icon ', type: 'link' },
                    { path: `/icons/themifyIcons`, title: 'Themify Icon ', type: 'link' },
                    { path: `/icons/featherIcons`, title: 'Feather Icon ', type: 'link' },
                    { path: `/icons/weatherIcons`, title: 'Whether Icon ', type: 'link' },
            ]
            },

            {
            
                title: 'Buttons', icon: Cloud, type: 'sub', active: false, children: [
                    { path: `/buttons/default-btn`, title: 'Default Style ', type: 'link' },
                    { path: `/buttons/flatBtn`, title: 'Flat Style', type: 'link' },
                    { path: `/buttons/edgeBtn`, title: 'Edge Style', type: 'link' },
                    { path: `/buttons/raisedBtn`, title: 'Raised Style', type: 'link' },
                    { path: `/buttons/groupBtn`, title: 'Button Group', type: 'link' },
            ]
            },

            {
                title: 'Charts', icon: BarChart, type: 'sub', active: false, children: [
                    { path: `/charts/apexCharts`, type: 'link', title: 'Apex Chart' },
                    { path: `/charts/googleChart`, type: 'link', title: 'Google Chart' },
                    { path: `/charts/knobChart`, type: 'link', title: 'Knob Chart' },
                    { path: `/charts/chartJs`, type: 'link', title: 'Chartjs' },
                    { path: `/charts/chartistComponent`, type: 'link', title: 'Chartist' },
            ]
            },

        ]
    },
    
    
    {
        menutitle:"Forms & Table",
        menucontent:"Ready to use froms & tables",
        Items:[
            {
                title: 'Forms', icon: FileText, type: 'sub', menutitle:"Forms & Table",menucontent:"Ready to use froms & tables", active: false, children: [
            {
                title: ' Form Controls ', type: 'sub', children: [
                    { title: 'Form Validation', type: 'link', path: `/forms/form-validation` },
                    { title: 'Basic Input', type: 'link', path: `/forms/baseInput` },
                    { title: 'Checkbox & Radio', type: 'link', path: `/forms/radio-checkbox` },
                    { title: 'Input Groups', type: 'link', path: `/forms/inputGroup` },
                    { title: 'Mega Option', type: 'link', path: `/forms/megaOptions` },

                ]
            },
            {
                title: 'Form Widgets', type: 'sub', children: [
                    { title: 'Datepicker', type: 'link', path: `/form-widget/datepicker` },
                    { title: 'Timepicker', type: 'link', path: `/form-widget/timepicker` },
                    { title: 'Typeahead', type: 'link', path: `/form-widget/typeahead` },
                ]
            },
            {
                title: 'Form Layout', type: 'sub', children: [
                    { path: `/form-layout/formDefault`, title: 'Form Default', type: 'link' },
                    { path: `/form-layout/formWizard`, title: 'Form Wizard', type: 'link' },
                ]
            },
            ],
            },

            {
                title: 'Tables', icon: Server, type: 'sub', children: [
                    {
                        title: ' Reactstrap Table ', type: 'sub', children: [
                            { title: 'Basic Table', type: 'link', path: `/table/basic` },
                            { title: 'Sizing Table', type: 'link', path: `/table/sizing` },
                            { title: 'Border Table', type: 'link', path: `/table/border` },
                            { title: 'Styling Table', type: 'link', path: `/table/styling` },
                        ]
                    },
                    {
                        title: 'Data Tables', path: `/table/datatable`, type: 'link'
                    }
                ]
            },
        ]
    },

    {
        menutitle:"Pages",
        menucontent:"All neccesory pages added",
        Items:[
            {
                title: 'Pages', icon: Layers, type: 'sub', badge2: true, active: false, children: [
                    { path: `/pages/samplepage`, title: 'Sample Page', type: 'link' },  
                    { path: `/pages/searchpage`, title: 'Search Pages', type: 'link' },
        
            ]
            }
        ]
    },

    {
        menutitle:"Miscellaneous",
        menucontent:"Bouns Pages & Apps",
        Items:[
            {
                title: 'Gallery', icon: Image, type: 'sub', active: false, children: [
                    { path: `/app/gallery/imageGallery`, title: 'Gallery Grid ', type: 'link' },
                    { path: `/app/gallery/imageWithDesc`, title: 'Gallery Grid  Desc ', type: 'link' },
                    { path: `/app/gallery/mesonryGallery`, title: 'Masonry Gallery', type: 'link' },
                    { path: `/app/gallery/mesonryDesc`, title: 'Masonry With Desc', type: 'link' },
                    { path: `/app/gallery/imageHover`, title: 'Hover Effect', type: 'link' }
            ]
            },
            
            {
                title: 'Blog',icon: Film, type: 'sub', active: false, children: [
                    { path: `/app/blog/blogDetail`, title: 'Blog Details', type: 'link' },
                    { path: `/app/blog/blogSingle`, title: 'Blog Single', type: 'link' },
                    { path: `/app/blog/blogPost`, title: 'Add Post', type: 'link' },
                ]
            },
            {
                title: 'Job Search',icon: Package, type: 'sub', active: false, children: [
                    { path: `/app/jobSearch/cardView`, title: 'Cards View', type: 'link' },
                    { path: `/app/jobSearch/job-list`, title: 'List View', type: 'link' },
                    { path: `/app/jobSearch/job-detail`, title: 'Job Details', type: 'link' },
                    { path: `/app/jobSearch/job-apply`, title: 'Apply', type: 'link' }
                ]
            },
            {
                title: 'Learning',icon: Radio, type: 'sub', active: false, children: [
                    { path: `/app/learning/learning-list`, title: 'Learning List', type: 'link' },
                    { path: `/app/learning/learning-detail`, title: 'Detail Course', type: 'link' },
                ]
            },
            {
                title: 'Maps', icon: Map, type: 'sub', active: false, children: [
                    { path: `/app/map/googleMap`, type: 'link', title: 'Google Maps ' },
                ]
            },
            {
                title: 'Editor', icon: Edit, type: 'sub', active: false, children: [
                    { path: `/app/editor/ckEditor`, type: 'link', title: 'CK  Editor' },
                    { path: `/app/editor/mdeEditor`, type: 'link', title: 'MDE Editor' },
                ]
            },
    
            { path: `/app/faq`,icon: HelpCircle,  type: 'link',active:false, title: 'FAQ' },
            { path: `/app/knowledgebase`,icon: Sunrise,  type: 'link',active:false,title: 'Knowledgebase' },
            { path: `/app/support-ticket`,icon: Users,  type: 'link', active:false,title: 'Support Ticket' },
    ]   
    },
]