package com.tfeo.backend.domain.review.service;

import com.tfeo.backend.common.model.type.MemberRoleType;
import com.tfeo.backend.domain.review.model.dto.AddReviewRequestDto;
import com.tfeo.backend.domain.review.model.dto.AddReviewResponseDto;
import com.tfeo.backend.domain.review.model.dto.ModifyReviewRequestDto;

public interface ReviewCommandService {
	AddReviewResponseDto addReview(Long memberNo, MemberRoleType role,
		AddReviewRequestDto request);

	Long modifyReview(Long memberNo, MemberRoleType role, Long reviewNo,
		ModifyReviewRequestDto request);

	void removeReview(Long memberNo, MemberRoleType role,
		Long reviewNo);
}
