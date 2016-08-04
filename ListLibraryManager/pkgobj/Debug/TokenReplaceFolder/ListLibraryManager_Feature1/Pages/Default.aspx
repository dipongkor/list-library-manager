<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <!-- JS Libraries -->
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script src="../Scripts/bootstrap.min.js" type="text/javascript"></script>
    <script src="../Scripts/angular.min.js" type="text/javascript"></script>
   <%-- <script src="../Scripts/angular-route.min.js" type="text/javascript"></script>--%>
    <script src="../Scripts/angular-ui-router.js"></script>
    <script src="../Scripts/angular-animate.min.js" type="text/javascript"></script>
    <script src="../Scripts/loading-bar.min.js" type="text/javascript"></script>
    <script src="../Scripts/sp-ng-module.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <meta name="WebPartPageExpansion" content="full" />

    <!-- CSS Libraries -->
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/loading-bar.min.css" rel="stylesheet" type='text/css' media='all' />

    <!-- APP CSS -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <!-- APP JS -->
    <script src="../Scripts/App/app.js" type="text/javascript"></script>
    <!-- Controllers -->
    <script src="../Scripts/App/controllers/home.js" type="text/javascript"></script>
    <script src="../Scripts/App/controllers/main.js" type="text/javascript"></script>
    <script src="../Scripts/App/controllers/listsByTemplate.js" type="text/javascript"></script>
    <script src="../Scripts/App/controllers/listDetails.js"></script>
     <!-- Services -->
    <script src="../Scripts/App/services/listLibraryManager.js" type="text/javascript"></script>

     <!-- Directives -->
    <script src="../Scripts/App/directives/navigation.js" type="text/javascript"></script>

</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
<div data-ng-app="listLibraryManagerApp" class="container">
    <navigation>

    </navigation>
   <div ui-view></div>
</div>
</asp:Content>
