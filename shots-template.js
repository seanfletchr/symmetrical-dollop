//testing

// Function to update scroll indicators
function updateScrollIndicators() {
	// Check if the content overflows
	const scrollableContainer = document.querySelector(".scrollable");
	if (scrollableContainer.scrollWidth > scrollableContainer.clientWidth) {
		// Calculate the scroll position as a percentage
		const scrollPercentage = (scrollableContainer.scrollLeft / (scrollableContainer.scrollWidth - scrollableContainer.clientWidth)) * 100;

		// Add or remove the "visible" class to scroll indicators
		const scrollForward = document.querySelector(".scroll-forward");
		const scrollBackward = document.querySelector(".scroll-backward");

		if (scrollPercentage === 0) {
			scrollForward.classList.add("visible");
			scrollBackward.classList.remove("visible");
		} else if (scrollPercentage === 100) {
			scrollForward.classList.remove("visible");
			scrollBackward.classList.add("visible");
		} else {
			scrollForward.classList.add("visible");
			scrollBackward.classList.add("visible");
		}
	}
}

// Function to scroll to the active pager element with animation
function scrollToActivePager() {
	const scrollableContainer = document.querySelector(".scrollable");
	const activeThumb = document.querySelector(".activethumb");

	if (scrollableContainer && activeThumb) {
		const containerWidth = scrollableContainer.clientWidth;
		const activeThumbLeft = activeThumb.offsetLeft;
		const activeThumbWidth = activeThumb.offsetWidth;

		// Take into account the left padding
		const padding = 5; // Adjust this value to match your CSS padding
		const scrollPosition = activeThumbLeft - padding + activeThumbWidth / 2 - containerWidth / 2;

		// Ensure the scroll position stays within bounds
		const maxScroll = scrollableContainer.scrollWidth - containerWidth;
		const finalScroll = Math.max(0, Math.min(scrollPosition, maxScroll));

		// Smoothly scroll to the active thumb element with padding
		$(scrollableContainer).stop().animate({ scrollLeft: finalScroll }, 200);
	}
}

// Listen for the "cycle-update-view" event on the element with class "cycle-slideshow"
$(".cycle-slideshow").on("cycle-update-view", function (event, optionHash, slideOptionsHash, currentSlideEl) {
	scrollToActivePager();
	updateScrollIndicators();
});

// Event listener for scroll
const scrollableContainer = document.querySelector(".scrollable");
scrollableContainer.addEventListener("scroll", updateScrollIndicators);

// Event listener for window resize
window.addEventListener("resize", function () {
	scrollToActivePager();
	updateScrollIndicators();
});

// Initial call to update scroll indicators
updateScrollIndicators();